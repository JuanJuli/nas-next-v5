export interface LspLoginResponse {
    lsp_id: string;
    lsp_name: string;
    tuk_id: string;
    institution_id: string;
    role_code: string[];
    role_name: string[];
    manage_multirole: boolean[];
    change_document: boolean[];
    is_nas: boolean[];
}