---
status: publish
published: true
pubDatetime: 2013-12-13T20:00:00.000Z
title: Unit Tests In VS2013, When It Makes Sense
author:
  display_name: Peter Kellner
  login: admin
  email: peter@peterkellner.net
  url: ''
author_login: admin
author_email: peter@peterkellner.net
wordpress_id: 3864
wordpress_url: https://peterkellner.net/?p=3864
date: '2013-12-13 11:15:59 -0800'
date_gmt: '2013-12-13 18:15:59 -0800'
categories:
- ASP.NET 2.0
tags: []
---
<h2>Introduction</h2>
<p>Many people will answer the question "what should you unit test in your project" with the flippant answer, "everything".  My answer to those people is that's great if you have infinite budget and time.  Unfortunately, I never seem to have either of  those things.  Especially building web sites, it's hard to test everything (though I agree completely possible).  In this article I'm going to show an example of a problem I had and how unit testing was clearly the right solution.</p>
<p>I'll first explain the problem, then talk about how I refactored my code to allow for unit testing, then I'll show the actual tests.</p>
<p>&nbsp;</p>
<h2>The Problem</h2>
<p>The problem is this.  We are building a <a href="http://www.codestarssummit.com/">new conference web site</a> with<a href="http://www.visualstudio.com/"> Visual Studio 2013</a> and plan on pricing based on two things.  The first is how far out the conference is, and the second is how many people have signed up already.  That is, we have a pricing table that looks like the following:</p>
<table width="400" border="1" cellspacing="3" cellpadding="2">
<tbody>
<tr>
<td valign="top" width="133">Price Good Through</td>
<td valign="top" width="197">Max Tickets To Sell Through this Price</td>
<td valign="top" width="69">Price</td>
</tr>
<tr>
<td valign="top" width="133">1/15/2014</td>
<td valign="top" width="197">10</td>
<td valign="top" width="69">$425</td>
</tr>
<tr>
<td valign="top" width="133">2/15/2014</td>
<td valign="top" width="197">25</td>
<td valign="top" width="69">$495</td>
</tr>
<tr>
<td valign="top" width="133">3/24/2014</td>
<td valign="top" width="197">95</td>
<td valign="top" width="69">$595</td>
</tr>
</tbody>
</table>
<p>&nbsp;</p>
<p>Seems straight forward enough, but the if you think through the details, what we really want to do is create a function that takes in this table of  price data, takes a given date (like today) and then tells you some answers.  Those answers are as follows:</p>
<p>What Is the Current Price?</p>
<ul>
<li>How Many Days Until The Price Increases?</li>
<li>What Is the Date of the Next Price Increase?</li>
<li>How Many Tickets Left at the Current Price?</li>
<li>How Much is the Next Price Going to Be?</li>
<li>What Is Full Price For This Ticket?</li>
</ul>
<p>You can imagine now that a lot could go wrong in writing the simple program to calculate the above results. There are literally millions of possible inputs and outputs.  What we will need to do is make some real world examples and then vary both the "today" date as well as how many tickets are already sold at the given attendance levels.  All of a sudden, not so simple.</p>
<h2>The Refactor</h2>
<p>Let's now take a look at the current project that does this work (before we create any unit tests).  Basically, we have in our business layer code the looks like this:</p>
<pre class="lang:c# decode:true">if (query.WithPricing.HasValue &amp;&amp; query.WithPricing.Value)
{
    // put the current payment status into the session
    var sessionPayment = sessionAttendeeResults.FirstOrDefault(a =&gt; a.Sessions_id == session.Id);

    // get the current pricing for the session and set it
    var sessionPriceList =
        sessionPriceResults.Where(a =&gt; a.SessionId == session.Id)
            .OrderBy(a =&gt; a.PriceGoodThroughDate)
            .ToList();

    CalcSessionPricesAndNextPrice(session, sessionPriceList,DateTime.Now);</pre>
<p>I realize it's just a chunk of the real project, but you get the idea.  We are reading from the database a price matrix for a given session, then, we are calling a local method "CalcSessionPricesAndNextPrice" with our session record (which will get all the results) and the price list.  We are passing in DateTime.Now so we get this answer based on right now (are we 60 days before the event for example).</p>
<p>So, what we are going to want to unit test is the  "CalcSessionPricesAndNextPrice" method with lots of different parameters.  In my case, I'm actually going to write  "CalcSessionPricesAndNextPrice" as I build my tests.  Some would say you should build all your tests first, then write the method and run all those tests, but my preference is to take little steps.  First write a couple tests, then write the method that solves that.  Repeat over and over until I feel I have a full compliment of tests.</p>
<h2>The Unit Test Project Setup</h2>
<p>Now we can create a unit test project.  I won't go through in Visual Studio 2013 the screens to get there. I assume you know how to do File/Create Project/Create C# Unit Test.  You can see in the screen shot below what I've created.  I always append my test project with .Test so it's clear what project I'm testing.</p>
<p><a href="/wp/wp-content/uploads/2013/12/vs1.jpg"><img class="alignnone size-medium wp-image-3867" alt="vs1" src="/wp/wp-content/uploads/2013/12/vs1-186x300.jpg" width="186" height="300" /></a></p>
<p>You can see this is our web solution.  Previously we had DataAccess and now we have DataAccess.Test with one unit test (SessionPriceGoodThroughTest.cs).</p>
<p>&nbsp;</p>
<h2>The Unit Tests Themselves</h2>
<p>Let's take a look now at the unit tests thenselves in the file SessionPriceGoodThroughTest.cs.  Basically, We've created 4 different test methods in our SessionPriceGoodThroughTests class.  One method, InitSessionDataForPricing basically gives some sample data that we will be testing on.  I've collapsed then below so you can see a screen shot giving some sense to our explanation.</p>
<p><a href="/wp/wp-content/uploads/2013/12/vs2.jpg"><img class="alignnone size-medium wp-image-3869" alt="vs2" src="/wp/wp-content/uploads/2013/12/vs2-300x240.jpg" width="300" height="240" /></a></p>
<p>And, the Init Method Expanded:</p>
<pre class="lang:c# decode:true">   private static void 
        InitSessionDataForPricing(out SessionsResult sessionsResult, 
        out List&lt;SessionPriceResult&gt; sessionPriceResults)
    {
        sessionsResult = new SessionsResult
        {
            Id = 1
        };

        sessionPriceResults = new List&lt;SessionPriceResult&gt;
        {
            new SessionPriceResult
            {
                Id = 1,
                PriceOfSession = 100.00M,
                MaxAtThisPrice = 1000,
                PriceGoodThroughDate = new DateTime(2010, 2, 1)
            },
            new SessionPriceResult
            {
                Id = 1,
                PriceOfSession = 250.00M,
                MaxAtThisPrice = 1000,
                PriceGoodThroughDate = new DateTime(2010, 2, 5)
            },
            new SessionPriceResult
            {
                Id = 1,
                PriceOfSession = 500.00M,
                MaxAtThisPrice = 1000,
                PriceGoodThroughDate = new DateTime(2010, 2, 10)
            }
        };
    }
}</pre>
<p>What we will do is build a matrix of tests covering ranges of both effective dates and current attendance.  Then, we will do asserts to make sure that our results are what we expect.  Let me next show just a few of these test methods.  I think  you will get the idea of what they do from the examples.</p>
<pre class="lang:c# decode:true">[TestMethod]
public void TestSessionPriceCalcCurrentAttendanceEffectiveDateBeforeAllPrices()
{
    SessionsResult sessionsResult;
    List&lt;SessionPriceResult&gt; sessionPriceResults;
    InitSessionDataForPricing(out sessionsResult, out sessionPriceResults);

    sessionPriceResults[0].MaxAtThisPrice = 5;   // 5 people, price through 2/5
    sessionPriceResults[1].MaxAtThisPrice = 15;  // 15 people, price through 2/10
    // does not matter final [2] because this is everyone else

    var effDate = new DateTime(2010, 1, 30);

    sessionsResult.CurrentAttendance = 0;
    SessionsManager.CalcSessionPricesAndNextPrice(sessionsResult, sessionPriceResults,
        effDate);
    Assert.AreEqual(sessionsResult.CurrentPrice, "100.00");
    Assert.AreEqual(sessionsResult.DaysUntilNextPrice, 2);
    Assert.AreEqual(sessionsResult.NextPrice, "250.00");
    Assert.AreEqual(sessionsResult.NextPriceDate, "2/5/2010");
    Assert.AreEqual(sessionsResult.SignupsUntilNextPrice,5);</pre>
<p>and, with a little extra automation around varying the number attending each session:</p>
<pre class="lang:c# decode:true">[TestMethod]
public void TestSessionPriceCalcCurrentAttendanceEffectiveDateAfterAllPrices()
{
    SessionsResult sessionsResult;
    List&lt;SessionPriceResult&gt; sessionPriceResults;
    InitSessionDataForPricing(out sessionsResult, out sessionPriceResults);

    var effDate = new DateTime(2010, 2, 18);

    sessionPriceResults[0].MaxAtThisPrice = 5;   // 5 people, price through 2/5
    sessionPriceResults[1].MaxAtThisPrice = 15;  // 15 people, price through 2/10
    // does not matter final [2] because this is everyone else

    // all prices should return the same, no matter what attendance
    var testAttendance = new List&lt;int&gt; {0,1,4,5,6,11,14,15,16,1000};
    foreach (var testNumber in testAttendance)
    {
        sessionsResult.CurrentAttendance = testNumber;
        SessionsManager.CalcSessionPricesAndNextPrice(sessionsResult, sessionPriceResults,
            effDate);
        Assert.AreEqual(sessionsResult.CurrentPrice, "500.00");
        Assert.AreEqual(sessionsResult.DaysUntilNextPrice, 0);
        Assert.AreEqual(sessionsResult.NextPrice, "500.00");
        Assert.AreEqual(sessionsResult.NextPriceDate, "2/10/2010");
        Assert.AreEqual(sessionsResult.SignupsUntilNextPrice, 0);
    }
}</pre>
<p>&nbsp;</p>
<h2>Running The Unit Tests</h2>
<p>I personally use ReSharper for running unit tests.  I like the interface so that is what I'm going to show.  You can see that all my tests have run successfully in the picture below.</p>
<p><a href="/wp/wp-content/uploads/2013/12/vs3.jpg"><img class="alignnone size-medium wp-image-3870" alt="vs3" src="/wp/wp-content/uploads/2013/12/vs3-300x140.jpg" width="300" height="140" /></a></p>
<p>&nbsp;</p>
<h2>Wrap Up</h2>
<p>I think you can see that in this case, having about 50 different unit tests really helps to flesh out that our method works.  I'm 100% sure this test saved time in writing the function that does the work (which I'll paste below just so you have an idea of what I'm testing, as well as gives me confidence now and in the future that it all really works.</p>
<pre class="lang:c# decode:true" title="The Code Being Tested">/// &lt;summary&gt;
/// process the SessionPriceList Based on a passed in date and figures out new prices
/// &lt;/summary&gt;
/// &lt;param name="session"&gt;&lt;/param&gt;
/// &lt;param name="sessionPriceList"&gt;&lt;/param&gt;
/// &lt;param name="effectiveDate"&gt;&lt;/param&gt;
public static void CalcSessionPricesAndNextPrice(
    SessionsResult session, 
    List&lt;SessionPriceResult&gt; sessionPriceList,
    DateTime effectiveDate)
{
    if (sessionPriceList.Count == 1)
    {
        session.RetailPrice = sessionPriceList[0].PriceOfSession.ToString("F2");
        session.NextPrice = session.RetailPrice;
        session.CurrentPrice = session.RetailPrice;
        return;
    }

    // assume retail price first
    CalculateRetailPrice(session, sessionPriceList);

    // look for first good price (effective now price). If none found, then assume retail price
    // this basically spins through price records until it hits one that is effective and not oversold.
    for (int index = 0; index &lt; sessionPriceList.Count; index++)
    {
        // check to see if this is the final price.  If so, then use retail price which is default
        if (index == sessionPriceList.Count-1)
        {
            CalculateRetailPrice(session, sessionPriceList);
            break;
        }
        var sessionPrice = sessionPriceList[index];

        if (sessionPrice.PriceGoodThroughDate.CompareTo(effectiveDate) &gt; 0)
        {
            session.CurrentPrice = sessionPrice.PriceOfSession.ToString("F2");
            if (index &lt; sessionPriceList.Count - 1)
            {
                var nextOne = sessionPriceList[index + 1];
                session.NextPriceDate = nextOne.PriceGoodThroughDate.ToString("d");
                session.NextPrice = nextOne.PriceOfSession.ToString("F2");
                session.DaysUntilNextPrice =
                    sessionPrice.PriceGoodThroughDate.Subtract(effectiveDate).Days;
            }

            // confirm that we have number at this slot (if null, then always stop at this price)
            if (!sessionPrice.MaxAtThisPrice.HasValue)
            {
                // no value for max a this price so we assume infinite can be sold at this price
                break;
            }

            // MaxAtThisPrice has value so figure out if we have exceeded it
            session.SignupsUntilNextPrice = sessionPrice.MaxAtThisPrice.Value -
                                            session.CurrentAttendance;
            if (session.SignupsUntilNextPrice &gt; 0)
            {
                // stop going through records because we have both an
                // effective date (guaranteed because we made it through if above)
                // and we have room at this price level
                break;
            }
            else
            {

            }
        }
    }
}</pre>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
