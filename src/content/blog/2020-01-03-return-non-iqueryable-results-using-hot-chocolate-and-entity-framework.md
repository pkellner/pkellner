---
status: publish
published: true
pubDatetime: 2020-01-03T20:00:00.000Z
title: How To Return Non IQueryable Results That Include Entity Framework Context in Hot Chocolate GraphQL Server
author:
  display_name: Peter Kellner
  login: Peter Kellner
  email: peter@peterkellner.net
  url: 'https://peterkellner.net'
author_login: admin

display_name: Peter Kellner
login: admin
email: peter@peterkellner.net
author_email: peter@peterkellner.net
description: Learn what is needed to build a resolver that returns from a resolver that is primarily designed to return Entity Framework results in an IQueryable format.
---

# Some Background

Assuming you've build a resolver primarily for returning Entity Framework results using the build int GraphQL Hot Chocolate extensions.  You are following the DI
pattern recommended by the Hot Chocolate team here:

[https://chillicream.com/docs/hotchocolate/integrations/entity-framework/][https://chillicream.com/docs/hotchocolate/integrations/entity-framework/]

Your code likely looks as follows:

{% highlight c# %}
namespace WebAppReactCRA.GraphQL.CodeCampYears
{
    [ExtendObjectType(Name = "Query")]
    public class CodeCampYearQueries
    {
        [UseDbContext(typeof(ApplicationDbContext))]
        public IQueryable<CodeCampYear> GetCodeCampYears([ScopedService] ApplicationDbContext context)
        {
            var query = from ccy in context.CodeCampYears
                join ccyt in context.CodeCampYearTypes on ccy.CodeCampYearTypeId equals ccyt.Id
                where ccyt.Name == "svcc"
                select ccy;
            return query;
        }
    }
}
{% endhighlight %}

This works great when you are just using Entity Framework and returning an IQueryable
which is what typically you get when you work with EF.

Say however, you want to either get some data from someplace else, or you want to
calculate something from EF and just return a concret type.  Assuming you still want to
use EF, you need to somehow get the EF context and then return a type that is not an EF type.

# Typical Problem You Might Find

I happen to be the organizer of Silicon Valley Code Camp and I often have crazy ideas for things I 
want to show and often, I need to write custom back end processing to get what I need.  In this case, 
not so crazy, but say I want to do the following:

<b>Generate a return that shows how many presenters at each years code camp over the years</b>

Let's do it.

# Add a New Resolver Method Adding It To Our Existing Speakers Resolver

For those in a hurry, here is the solution.  I'll explain it after this if it's not obvious to you what I've
done.

{% highlight c# %}
[ExtendObjectType(Name = "Query")]
public class CodeCampYearQueries
{
    private readonly IDbContextFactory<ApplicationDbContext> _contextFactory;

    public CodeCampYearQueries(IDbContextFactory<ApplicationDbContext> contextFactory)
    {
        _contextFactory = contextFactory;
    }

    [UseDbContext(typeof(ApplicationDbContext))]
    public IQueryable<CodeCampYear> GetCodeCampYears([ScopedService] ApplicationDbContext context)
    {
        var query = from ccy in context.CodeCampYears
            join ccyt in context.CodeCampYearTypes on ccy.CodeCampYearTypeId equals ccyt.Id
            where ccyt.Name == "svcc"
            select ccy;
        return query;
    }

    public List<SpeakerCountByYear> GetSpeakersPerCodeCampYear(
        string codeCampYear = null)
    {
        using var context = _contextFactory.CreateDbContext();

        var speakerCounts = new List<SpeakerCountByYear>();

        // Get a list of all code camp years
        var ccys = (from ccy in context.CodeCampYears
            join ccyt in context.CodeCampYearTypes on ccy.CodeCampYearTypeId equals ccyt.Id
            where ccyt.Name == "svcc"
            select ccy).ToList();

        var ccyIdsByYear = ccys.ToDictionary(k => k.UrlPostToken, v => v.Id);
        var ccyYearById = ccys.ToDictionary(k => k.Id, v => v.UrlPostToken);
        var codeCampYearIds =
            string.IsNullOrEmpty(codeCampYear)
                ? ccys.Select(a => a.Id).ToList()
                : new List<int> {ccyIdsByYear[codeCampYear]};

        foreach (var ccyId in codeCampYearIds)
        {
            var cnt = (from sessionPresenter in context.SessionPresenters
                join session in context.Sessions on sessionPresenter.SessionId equals session.Id
                join ccy in context.CodeCampYears on session.CodeCampYearId equals ccy.Id
                where session.CodeCampYearId == ccyId &&
                      session.Approved == true
                select sessionPresenter.Attendee.Id).Distinct().Count();
            speakerCounts.Add(new SpeakerCountByYear
            {
                Year = ccyYearById[ccyId],
                SpeakerCount = cnt
            });
        }

        return speakerCounts;
    }
}

public class SpeakerCountByYear
{
    public string Year { get; set; }
    public int SpeakerCount { get; set; }
}
{% endhighlight %}

Here's the explanation:

To start, `[ScopedService] ApplicationDbContext context` is no longer going to give us a
valid EF context so we need to use the factory pattern to generate our own and then store
an instance of the factory `_contextFactory`.  Then, in the method `GetSpeakersPerCodeCampYear`, first thing
is we use that factory to get an EF context we can use in the method for all our work.  That's the line:

`using var context = _contextFactory.CreateDbContext();`

Next, we do a bunch of Entity Framework work to get the result we want.  For me, this kind of coding is super 
fast as I know my data models well and I'm using them all the time with LINQ. I won't explain the
details, as it's not really relevant, just think of it as "a bunch of stuff".

As an aside, if you're thinking, "wow, that's going to be really slow, I'd never put something like this in
production code!".  Well, I'd have to disagree with you. I'm running against a 1GB database (our production
data for our real code camp), and even though this ran 14 individual queries, each with multiple join
and where clauses, each query took under 1 millisecond so not much of a load.

Finally, I'm returning speakerCounts which is just a `List<SpeakerCountByYear>`.  Notice that I created my own
simple type `SpeakerCountByYear` to make that happen.

# Conclusion

Be flexible when creating resolvers and you can do practially anything you want, including
using all your Entity Framework (EF) results.



HTH's.








[https://chillicream.com/docs/hotchocolate/integrations/entity-framework/]: https://chillicream.com/docs/hotchocolate/integrations/entity-framework/
