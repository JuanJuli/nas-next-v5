export interface ListMenu {
    row_id: number;
    name: string;
    link: string;
    icon: string;
    parent: number | null;
    action_menu: string;
    created_date: string;
    modified_date: string;
    deleted_at: string | null;
    created_by: string;
    modified_by: string;
    deleted_by: string | null;

    children?: ListMenu[];
}

export interface AccessRoleAll {
    list_menu: ListMenu[];
    access_role: string[];
    access_module: string[];
}