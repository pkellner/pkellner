<%@ Page Language="C#" MasterPageFile="~/MasterPageNoHeadShot.master" AutoEventWireup="true"
    CodeFile="DefaultWithProfile.aspx.cs" Inherits="test" Title="AJAX Membership Editor" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <atlas:ScriptManager ID="sm" runat="server" EnablePartialRendering="true">
        <Scripts>
            <atlas:ScriptReference Path="ScriptLibrary/TextChangedBehavior.js" />
        </Scripts>
    </atlas:ScriptManager>
    <table>
        <tr>
            <td align="left" style="width: 600px">
                Demonstrating The ObjectDataSource Built with Profile Information&nbsp;(Notice First
                and Last Name in GridView Below.&nbsp; Using March Atlas)<br />
            </td>
        </tr>
        
        <tr>
            <td colspan="2">
                <asp:HyperLink ID="HyperLinkNoAjax" runat="server" NavigateUrl="http://painfreeods.peterkellner.net/">Back To PainFree ODS Generator</asp:HyperLink>
            </td>
        </tr>
    </table>

    <script type="text/javascript">
        function onTextChange() {
            __doPostBack('ctl00_ContentPlaceHolder1_GridViewMemberUser','') ;
        }
    </script>

    <div>
        <table style="font-weight: normal; font-size: 12px; font-family: Arial" border="0"
            cellpadding="1" cellspacing="2" bgcolor="white" width="100%">
            <tr bgcolor="#ccffff">
                <td align="center" style="height: 200px">
                    <br />
                    <table cellpadding="5">
                        <tr>
                            <td style="width: 100px">
                                <asp:Label ID="Label1" runat="server" Text="Enter UserName"></asp:Label></td>
                            <td style="width: 100px">
                                <asp:TextBox ID="TextBoxUserSearch" runat="server" AutoPostBack="False" CausesValidation="True"></asp:TextBox></td>
                            <td>
                                <atlas:UpdatePanel ID="UpdatePanel1" runat="server" Mode="Always">
                                    <ContentTemplate>
                                        <asp:TextBox ID="UserCounter" Visible="false" runat="server" Text="<%# UserCountString %>"></asp:TextBox>
                                    </ContentTemplate>
                                </atlas:UpdatePanel>
                            </td>
                        </tr>
                    </table>
                    &nbsp;
                    <atlas:UpdatePanel ID="UpdatePanelUserList" runat="server" Mode="Always">
                        <ContentTemplate>
                            <asp:GridView ID="GridViewMemberUser" runat="server" OnSelectedIndexChanged="GridViewMembershipUser_SelectedIndexChanged"
                                OnRowDeleted="GridViewMembership_RowDeleted" AllowPaging="True" AutoGenerateColumns="False"
                                DataKeyNames="UserName" DataSourceID="ObjectDataSourceMembershipUser" AllowSorting="True"
                                CellPadding="1" Font-Size="X-Small" Width="95%" ForeColor="#333333" GridLines="None"
                                BorderColor="White" PageSize="6">
                                <Columns>
                                    <asp:CommandField ShowDeleteButton="True" ShowEditButton="True" ShowSelectButton="True" />
                                    <asp:BoundField DataField="UserName" HeaderText="UserName" ReadOnly="True" SortExpression="UserName" />
                                    <asp:BoundField DataField="FirstName" HeaderText="FirstName" ReadOnly="False" SortExpression="FirstName" />
                                    <asp:BoundField DataField="LastName" HeaderText="LastName" ReadOnly="False" SortExpression="LastName" />
                                    
                                    <asp:BoundField DataField="Email" HeaderText="Email" SortExpression="Email" />
                                    <asp:BoundField DataField="PasswordQuestion" HeaderText="PasswordQuestion" ReadOnly="True"
                                        SortExpression="PasswordQuestion" />
                                    <asp:BoundField DataField="Comment" HeaderText="Comment" SortExpression="Comment" />
                                    <asp:BoundField DataField="CreationDate" HeaderText="CreationDate" ReadOnly="True"
                                        SortExpression="CreationDate" Visible="False" />
                                    <asp:CheckBoxField DataField="IsApproved" HeaderText="IsApproved" SortExpression="IsApproved" />
                                    <asp:BoundField DataField="LastLockoutDate" Visible="False" HeaderText="LastLockoutDate"
                                        ReadOnly="True" SortExpression="LastLockoutDate" />
                                    <asp:BoundField DataField="LastLoginDate" HeaderText="LastLoginDate" SortExpression="LastLoginDate"
                                        Visible="False" />
                                    <asp:CheckBoxField DataField="IsOnline" Visible="False" HeaderText="IsOnline" ReadOnly="True"
                                        SortExpression="IsOnline" />
                                    <asp:CheckBoxField DataField="IsLockedOut" HeaderText="IsLockedOut" ReadOnly="True"
                                        SortExpression="IsLockedOut" Visible="False" />
                                    <asp:BoundField DataField="LastActivityDate" HeaderText="LastActivityDate" SortExpression="LastActivityDate"
                                        Visible="False" />
                                    <asp:BoundField DataField="LastPasswordChangedDate" HeaderText="LastPasswordChangedDate"
                                        Visible="False" ReadOnly="True" SortExpression="LastPasswordChangedDate" />
                                    <asp:BoundField DataField="ProviderName" HeaderText="ProviderName" ReadOnly="True"
                                        Visible="False" SortExpression="ProviderName" />
                                </Columns>
                                <FooterStyle BackColor="#507CD1" ForeColor="White" Font-Bold="True" />
                                <RowStyle BackColor="#EFF3FB" />
                                <SelectedRowStyle BackColor="#D1DDF1" Font-Bold="True" ForeColor="#333333" />
                                <PagerStyle BackColor="#2461BF" ForeColor="White" HorizontalAlign="Center" />
                                <HeaderStyle BackColor="#507CD1" Font-Bold="False" ForeColor="White" />
                                <EditRowStyle BackColor="#2461BF" />
                                <AlternatingRowStyle BackColor="White" />
                            </asp:GridView>
                        </ContentTemplate>
                    </atlas:UpdatePanel>
                    <asp:ObjectDataSource ID="ObjectDataSourceMembershipUser" runat="server" DeleteMethod="Delete"
                        InsertMethod="Insert" OldValuesParameterFormatString="{0}" SelectMethod="GetMembers"
                        TypeName="MembershipUtilities.MembershipUserODS" UpdateMethod="Update" SortParameterName="SortData" >
                        <DeleteParameters>
                            <asp:Parameter Name="UserName" Type="String" />
                        </DeleteParameters>
                        <UpdateParameters>
                            <asp:Parameter Name="UserName" Type="String" />
                            <asp:Parameter Name="email" Type="String" />
                            <asp:Parameter Name="isApproved" Type="Boolean" />
                            <asp:Parameter Name="comment" Type="String" />
                            <asp:Parameter Name="lastActivityDate" Type="DateTime" />
                            <asp:Parameter Name="lastLoginDate" Type="DateTime" />
                        </UpdateParameters>
                        <SelectParameters>
                            <asp:Parameter DefaultValue="false" Name="returnAllApprovedUsers" Type="Boolean" />
                            <asp:Parameter DefaultValue="false" Name="returnAllNotApprovedUsers" Type="Boolean" />
                            <asp:ControlParameter ControlID="TextBoxUserSearch" DefaultValue="" Name="usernameToFind"
                                PropertyName="Text" Type="String" />
                            <asp:Parameter Name="sortData" Type="String" />
                        </SelectParameters>
                        <InsertParameters>
                            <asp:Parameter Name="userName" Type="String" />
                            <asp:Parameter Name="isApproved" Type="Boolean" />
                            <asp:Parameter Name="comment" Type="String" />
                            <asp:Parameter Name="lastLockoutDate" Type="DateTime" />
                            <asp:Parameter Name="creationDate" Type="DateTime" />
                            <asp:Parameter Name="email" Type="String" />
                            <asp:Parameter Name="lastActivityDate" Type="DateTime" />
                            <asp:Parameter Name="providerName" Type="String" />
                            <asp:Parameter Name="isLockedOut" Type="Boolean" />
                            <asp:Parameter Name="lastLoginDate" Type="DateTime" />
                            <asp:Parameter Name="isOnline" Type="Boolean" />
                            <asp:Parameter Name="passwordQuestion" Type="String" />
                            <asp:Parameter Name="lastPasswordChangedDate" Type="DateTime" />
                            <asp:Parameter Name="password" Type="String" />
                            <asp:Parameter Name="passwordAnswer" Type="String" />
                        </InsertParameters>
                    </asp:ObjectDataSource>
                    &nbsp;
                    <br />
                    <br />
                </td>
            </tr>
        </table>
        <atlas:UpdatePanel ID="UpdatePanelCheckBoxes" runat="server">
            <ContentTemplate>
                <asp:CheckBox ID="CheckBoxManageRoles" Text="Manage Roles" runat="server" AutoPostBack="True" />
                <asp:CheckBox ID="CheckBoxAddUser" Text="Create New Users" runat="server" AutoPostBack="True" />&nbsp;
                <asp:Button ID="ButtonResetUsers" runat="server" OnClick="ButtonResetUsers_Click"
                    Text="Reset Users And Roles " />
            </ContentTemplate>
        </atlas:UpdatePanel>
        <table style="font-weight: normal; font-size: 12px; font-family: Arial" bgcolor="white"
            width="100%" border="0" cellpadding="1" cellspacing="2">
            <tr valign="top" bgcolor="#ccffff">
                <td runat="server" id="RoleManagerSection" align="center" width="30%">
                    <atlas:UpdatePanel ID="UpdatePanelManageRoles" runat="server">
                        <ContentTemplate>
                            <br />
                            <asp:GridView ID="GridViewRole" runat="server" AutoGenerateColumns="False" DataSourceID="ObjectDataSourceRoleObject"
                                DataKeyNames="RoleName" CellPadding="3" CellSpacing="3" AllowPaging="True" HorizontalAlign="Center"
                                Width="100%" PageSize="5">
                                <Columns>
                                    <asp:CommandField ShowDeleteButton="True" DeleteText="Delete Role" />
                                    <asp:TemplateField>
                                        <ItemTemplate>
                                            <asp:Button ID="Button1" runat="server" CausesValidation="false" Width="250px" OnClick="ToggleInRole_Click"
                                                Text='<%# ShowInRoleStatus( (string) Eval("UserName"),(string) Eval("RoleName")) %>' />
                                        </ItemTemplate>
                                        <ItemStyle HorizontalAlign="Left" />
                                        <HeaderTemplate>
                                            Status of roles for selected user
                                        </HeaderTemplate>
                                    </asp:TemplateField>
                                    <asp:BoundField DataField="NumberOfUsersInRole" HeaderText="Number Of Users In Role"
                                        SortExpression="NumberOfUsersInRole" />
                                    <asp:BoundField DataField="RoleName" ReadOnly="True" Visible="False" HeaderText="RoleName"
                                        SortExpression="RoleName" />
                                    <asp:CheckBoxField DataField="UserInRole" HeaderText="UserInRole" Visible="False"
                                        SortExpression="UserInRole" />
                                </Columns>
                            </asp:GridView>
                            <asp:CheckBox ID="CheckBoxShowRolesAssigned" runat="server" AutoPostBack="True" Text="Show Roles Assigned Only" />
                        </ContentTemplate>
                    </atlas:UpdatePanel>
                </td>
                <td align="center" width="20%">
                    <atlas:UpdatePanel ID="UpdatePanelCreateNewRole" runat="server">
                        <ContentTemplate>
                            <br />
                            <asp:Label runat="server" ID="LabelCreateRole" Text="Role Name" />
                            <asp:TextBox ID="TextBoxCreateNewRole" Width="75" runat="server"></asp:TextBox><br />
                            <br />
                            <asp:Button ID="ButtonCreateNewRole" runat="server" OnClick="ButtonCreateNewRole_Click"
                                Text="Create Role" /><br />
                            <br />
                            &nbsp;
                        </ContentTemplate>
                    </atlas:UpdatePanel>
                </td>
                <td align="center" width="50%">
                    <br />
                    <atlas:UpdatePanel ID="UpdatePanelCreateUser" runat="server">
                        <ContentTemplate>
                            <table cellpadding="2" cellspacing="2">
                                <tr>
                                    <td style="height: 28px; width: 120px;">
                                        <asp:Label ID="LabelUserName" Text="UserName" runat="server"></asp:Label>
                                    </td>
                                    <td style="height: 28px">
                                        <asp:TextBox ID="TextBoxUserName" runat="server"></asp:TextBox>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="height: 28px; width: 120px;">
                                        <asp:Label ID="LabelPassword" Text="Password" runat="server"></asp:Label>
                                    </td>
                                    <td style="height: 28px">
                                        <asp:TextBox ID="TextBoxPassword" runat="server"></asp:TextBox>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="width: 140px">
                                        <asp:Label ID="LabelPasswordQuestion" Text="PasswordQuestion" runat="server"></asp:Label>
                                    </td>
                                    <td>
                                        <asp:TextBox ID="TextBoxPasswordQuestion" runat="server"></asp:TextBox>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="width: 120px">
                                        <asp:Label ID="LabelPasswordAnswer" Text="PasswordAnswer" runat="server"></asp:Label>
                                    </td>
                                    <td>
                                        <asp:TextBox ID="TextBoxPasswordAnswer" runat="server"></asp:TextBox>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="width: 120px">
                                        <asp:Label ID="LabelEmail" Text="Email" runat="server"></asp:Label>
                                    </td>
                                    <td>
                                        <asp:TextBox ID="TextBoxEmail" runat="server"></asp:TextBox>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="width: 120px">
                                        <asp:Label ID="LabelApproved" Text="Approved" runat="server"></asp:Label>
                                    </td>
                                    <td>
                                        <asp:CheckBox ID="CheckboxApproval" runat="server"></asp:CheckBox>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="width: 120px">
                                        <asp:Button ID="ButtonNewUser" runat="server" Text="Create New User" OnClick="ButtonNewUser_Click" />
                                    </td>
                                </tr>
                            </table>
                        </ContentTemplate>
                    </atlas:UpdatePanel>
                    <asp:Label ID="LabelInsertMessage" runat="server"></asp:Label>
                </td>
            </tr>
        </table>
    </div>
    <table style="font-weight: normal; font-size: 12px; font-family: Arial" border="0"
        cellpadding="1" cellspacing="2" bgcolor="white" width="100%">
        <tr bgcolor="#ccffff">
            <td align="center">
                Developed By
                <asp:HyperLink ID="HyperLink1" runat="server" NavigateUrl="http://peterkellner.net">http://peterkellner.net</asp:HyperLink></td>
        </tr>
    </table>
    <asp:ObjectDataSource ID="ObjectDataSourceRoleObject" runat="server" SelectMethod="GetRoles"
        TypeName="MembershipUtilities.RoleDataObject" InsertMethod="Insert" DeleteMethod="Delete">
        <SelectParameters>
            <asp:ControlParameter ControlID="GridViewMemberUser" Name="UserName" PropertyName="SelectedValue"
                Type="String" />
            <asp:ControlParameter ControlID="CheckBoxShowRolesAssigned" Name="ShowOnlyAssignedRolls"
                PropertyName="Checked" Type="Boolean" />
        </SelectParameters>
        <InsertParameters>
            <asp:Parameter Name="RoleName" Type="String" />
        </InsertParameters>
        <DeleteParameters>
            <asp:Parameter Name="RoleName" Type="String" />
        </DeleteParameters>
    </asp:ObjectDataSource>

    <script type="text/xml-script">
        <page>
            <components>
                <textBox id="ctl00_ContentPlaceHolder1_TextBoxUserSearch">
                    <behaviors>
                        <textChangedBehavior timeout="100"
                                             changed="onTextChange" />
                    </behaviors>
                </textBox>
            </components>
        </page>
    </script>

</asp:Content>
