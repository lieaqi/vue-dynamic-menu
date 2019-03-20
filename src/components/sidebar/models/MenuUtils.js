import { SideBarMenu } from './SideBarMenu';
import { SideBarMenuItem } from './SideBarMenuItem';

class MenuUtils {
    constructor() {
        this.menu = new SideBarMenu('MainMenu', 'MainMenu', [
            // new SideBarMenuItem(
            //     'Dashboard',
            //     'Pages.Administration.Host.Dashboard',
            //     'fa fa-home',
            //     '/dashboard/hostdashboard'
            // ),
            // new SideBarMenuItem(
            //     'Dashboard',
            //     'Pages.Tenant.Dashboard',
            //     'fa fa-home',
            //     '/dashboard/tenantdashboard'
            // ),
            // new SideBarMenuItem(
            //     'Tenants',
            //     'Pages.Tenants',
            //     'fa fa-globe',
            //     '/admin/tenants'
            // ),
            // new SideBarMenuItem(
            //     'Business',
            //     'Pages.Business',
            //     'fa fa-bars',
            //     '/YDH/business'
            // ),
            new SideBarMenuItem(
                'ProductList',
                'Pages.ProductList',
                'fa fa-wrench',
                '#',
                [
                    new SideBarMenuItem(
                        'YiQiTui',
                        'Pages.YiQiTui',
                        'fa fa-bars',
                        '/YDH/YiQiTui'
                    ),
                    new SideBarMenuItem(
                        'YiDingHuo',
                        'Pages.YiDingHuo',
                        'fa fa-bars',
                        '/YDH/YiDingHuo'
                    ),
                ]
            ),
            new SideBarMenuItem(
                'Template',
                'Pages.Template',
                'fa fa-bars',
                '/YDH/Template'
            ),
            new SideBarMenuItem(
                'Editions',
                'Pages.Versions',
                'fa fa-bars',
                '/YDH/editions'
            ),
            new SideBarMenuItem(
                'MenuMethod',
                'Pages.MenuMethod',
                'fa fa-bars',
                '/YDH/MenuMethod'
            ),

            new SideBarMenuItem(
                'Agent',
                'Pages.Agent',
                'fa fa-bars',
                '/agencyManagement/Agent'
            ),
            new SideBarMenuItem(
                'Product',
                'Pages.Product',
                'fa fa-bars',
                '/agencyManagement/Product'
            ),
            new SideBarMenuItem(
                'Customer',
                'Pages.Customer',
                'fa fa-bars',
                '/agencyManagement/Customer'
            ),
            new SideBarMenuItem(
                'Order',
                'Pages.Order',
                'fa fa-bars',
                '/agencyManagement/Order'
            ),
            new SideBarMenuItem(
                'Finance',
                'Pages.Finance',
                'fa fa-bars',
                '/agencyManagement/Finance'
            ),
            new SideBarMenuItem(
                'Poster',
                'Pages.Poster',
                'fa fa-bars',
                '/Poster'
            ),
            new SideBarMenuItem(
                'InvitationCode',
                'Pages.InvitationCode',
                'fa fa-bars',
                '#',
                [
                    new SideBarMenuItem(
                        'InvitationCodeDetail',
                        'Pages.InvitationCodeDetail',
                        'fa fa-bars',
                        '/InvitationCodeDetail'
                    ),
                    new SideBarMenuItem(
                        'InvitationCodeAbout',
                        'Pages.InvitationCodeAbout',
                        'fa fa-bars',
                        '/InvitationCodeAbout'
                    ),
                ]
            ),
            new SideBarMenuItem(
                'MyInvitationCode',
                'Pages.MyInvitationCode',
                'fa fa-bars',
                '#',
                [
                    new SideBarMenuItem(
                        'MyInvitationCodeDetail',
                        'Pages.MyInvitationCodeDetail',
                        'fa fa-bars',
                        '/MyInvitationCodeDetail'
                    ),
                    new SideBarMenuItem(
                        'MyInvitationCodeAbout',
                        'Pages.MyInvitationCodeAbout',
                        'fa fa-bars',
                        '/MyInvitationCodeAbout'
                    ),
                ]
            ),
            new SideBarMenuItem(
                'Administration',
                'Pages.Administration',
                'fa fa-wrench',
                '#',
                [
                    new SideBarMenuItem(
                        'OrganizationUnits',
                        'Pages.Administration.OrganizationUnits',
                        'fa fa-th',
                        '/admin/organization'
                    ),
                    new SideBarMenuItem(
                        'Roles',
                        'Pages.Administration.Roles',
                        'fa fa-briefcase',
                        '/admin/roles'
                    ),
                    new SideBarMenuItem(
                        'Users',
                        'Pages.Administration.Users',
                        'fa fa-group',
                        '/admin/users'
                    ),
                    new SideBarMenuItem(
                        'Languages',
                        'Pages.Administration.Languages',
                        'fa fa-flag',
                        '/admin/languages'
                    ),
                    new SideBarMenuItem(
                        'AuditLogs',
                        'Pages.Administration.AuditLogs',
                        'fa fa-lock',
                        '/admin/auditlogs'
                    ),
                    new SideBarMenuItem(
                        'Maintenance',
                        'Pages.Administration.Host.Maintenance',
                        'fa fa-wrench',
                        '/admin/maintenance'
                    ),
                    new SideBarMenuItem(
                        'Subscription',
                        'Pages.Administration.Tenant.SubscriptionManagement',
                        'fa fa-refresh',
                        '/admin/subscriptions'
                    ),
                    new SideBarMenuItem(
                        'Settings',
                        'Pages.Administration.Host.Settings',
                        'fa fa-cog',
                        '/admin/hostsettings'
                    ),
                    new SideBarMenuItem(
                        'Settings',
                        'Pages.Administration.Tenant.Settings',
                        'fa fa-cog',
                        '/admin/tenantsettings'
                    )
                ]
            )
            ,
            // new SideBarMenuItem(
            //     'DemoUiComponents',
            //     'Pages.DemoUiComponents',
            //     'fa fa-puzzle-piece',
            //     '/app/admin/demo-ui-components'
            // )
        ]);

        abp.nav.menus = this.menu;
    }

    get getMenu() {
        return this.menu;
    }
}

export default new MenuUtils();
