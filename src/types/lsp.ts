// type LSPDataDetail struct {
// 	RowID              uint                `json:"row_id"`
// 	LspID              string              `json:"lsp_id"`
// 	LspName            string              `json:"lsp_name"`
// 	LspType            *string             `json:"lsp_type"`
// 	DirectorName       string              `json:"director_name"`
// 	DirectorSignature  string              `json:"director_signature"`
// 	LeadLable          string              `json:"lead_lable"`
// 	CertificationMng   string              `json:"certification_mng"`
// 	SkLspNumber        string              `json:"sk_lsp_number"`
// 	SkExpiredDate      *string             `json:"sk_expired_date"`
// 	LicenseNumber      string              `json:"license_number"`
// 	Address            string              `json:"address"`
// 	ContactDirector    string              `json:"contact_director"`
// 	ContactLsp         string              `json:"contact_lsp"`
// 	Logo               *string             `json:"logo"`
// 	ThumbnailLogin     string              `json:"thumbnail_login"`
// 	EmailFrom          string              `json:"email_from"`
// 	Favicon            string              `json:"favicon"`
// 	CertificateLicense string              `json:"certificate_license"`
// 	ContractStartDate  *string             `json:"contract_start_date"`
// 	ContractEndDate    *string             `json:"contract_end_date"`
// 	Longitude          *float64            `json:"longitude"`
// 	Latitude           *float64            `json:"latitude"`
// 	IsIntegrated       *int                `json:"is_integrated"`
// 	LspCode            *string             `json:"lsp_code"`
// 	FoundedDate        *string             `json:"founded_date"`
// 	CityName           *string             `json:"city_name"`
// 	WhiteLable         *bool               `json:"white_lable"`
// 	CheckAllCompetency *bool               `json:"check_all_competency"`
// 	ColorTheme         *string             `json:"color_theme"`
// 	Active             *bool               `json:"active"`
// 	CreatedDate        *string             `json:"created_date"`
// 	ModifiedDate       *string             `json:"modified_date"`
// 	DeletedAt          *string             `json:"deleted_at"`
// 	CreatedBy          string              `json:"created_by"`
// 	ModifiedBy         string              `json:"modified_by"`
// 	DeletedBy          string              `json:"deleted_by"`
// 	Domain             *string             `json:"domain"`
// 	User               *LSPDataDetail_User `json:"user"`
// 	LspExclusiveRoles  *[]LspExclusiveRole `json:"lsp_exclusive_roles"`
// 	TotalSchema        *int64              `json:"total_schema,omitempty"`
// }

// type LspExclusiveRole struct {
// 	RowID  int    `json:"row_id,omitempty"`
// 	RoleID int    `json:"role_id"`
// 	LspID  string `json:"lsp_id"`
// }


// type LSPDataDetail struct {
// 	RowID              uint                `json:"row_id"`
// 	LspID              string              `json:"lsp_id"`
// 	LspName            string              `json:"lsp_name"`
// 	LspType            *string             `json:"lsp_type"`
// 	DirectorName       string              `json:"director_name"`
// 	DirectorSignature  string              `json:"director_signature"`
// 	LeadLable          string              `json:"lead_lable"`
// 	CertificationMng   string              `json:"certification_mng"`
// 	SkLspNumber        string              `json:"sk_lsp_number"`
// 	SkExpiredDate      *string             `json:"sk_expired_date"`
// 	LicenseNumber      string              `json:"license_number"`
// 	Address            string              `json:"address"`
// 	ContactDirector    string              `json:"contact_director"`
// 	ContactLsp         string              `json:"contact_lsp"`
// 	Logo               *string             `json:"logo"`
// 	ThumbnailLogin     string              `json:"thumbnail_login"`
// 	EmailFrom          string              `json:"email_from"`
// 	Favicon            string              `json:"favicon"`
// 	CertificateLicense string              `json:"certificate_license"`
// 	ContractStartDate  *string             `json:"contract_start_date"`
// 	ContractEndDate    *string             `json:"contract_end_date"`
// 	Longitude          *float64            `json:"longitude"`
// 	Latitude           *float64            `json:"latitude"`
// 	IsIntegrated       *int                `json:"is_integrated"`
// 	LspCode            *string             `json:"lsp_code"`
// 	FoundedDate        *string             `json:"founded_date"`
// 	CityName           *string             `json:"city_name"`
// 	WhiteLable         *bool               `json:"white_lable"`
// 	CheckAllCompetency *bool               `json:"check_all_competency"`
// 	ColorTheme         *string             `json:"color_theme"`
// 	Active             *bool               `json:"active"`
// 	CreatedDate        *string             `json:"created_date"`
// 	ModifiedDate       *string             `json:"modified_date"`
// 	DeletedAt          *string             `json:"deleted_at"`
// 	CreatedBy          string              `json:"created_by"`
// 	ModifiedBy         string              `json:"modified_by"`
// 	DeletedBy          string              `json:"deleted_by"`
// 	Domain             *string             `json:"domain"`
// 	User               *LSPDataDetail_User `json:"user"`
// 	LspExclusiveRoles  *[]LspExclusiveRole `json:"lsp_exclusive_roles"`
// 	TotalSchema        *int64              `json:"total_schema,omitempty"`
// }

interface LSPDataDetailUser {
  row_id: number;
  user_id: string;
  full_name: string;
  email: string;
  phone: string;
  is_active: number;
  created_date: string;
}

interface LspExclusiveRole {
  row_id: number;
  role_id: number;
  lsp_id: string;
}

export interface LspByDomain {
  row_id: number;
  lsp_id: string;
  lsp_name: string;
  lsp_type: string | null;
  director_name: string;
  director_signature: string;
  lead_lable: string;
  certification_mng: string;
  sk_lsp_number: string;
  sk_expired_date: string | null;
  license_number: string;
  address: string;
  contact_director: string;
  contact_lsp: string;
  logo: string | null;
  thumbnail_login: string;
  email_from: string;
  favicon: string;
  certificate_license: string;
  contract_start_date: string | null;
  contract_end_date: string | null;
  longitude: number | null;
  latitude: number | null;
  is_integrated: number | null;
  lsp_code: string | null;
  founded_date: string | null;
  city_name: string | null;
  white_lable: boolean | null;
  check_all_competency: boolean | null;
  color_theme: string | null;
  active: boolean | null;
  created_date: string | null;
  modified_date: string | null;
  deleted_at: string | null;
  created_by: string;
  modified_by: string;
  deleted_by: string;
  domain: string | null;
  user: LSPDataDetailUser | null;
  lsp_exclusive_roles: LspExclusiveRole[] | null;
  total_schema?: number | null;
}