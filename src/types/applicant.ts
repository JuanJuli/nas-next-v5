interface User {
    row_id: number;
    user_id: string;
    jobs_code: string;
    picture: string;
    nik: string;
    full_name: string;
    contact: string;
    address: string;
    place_of_birth: string;
    gender_code: string;
    signature: string;
    date_of_birth: string;
    last_login: string;
    activated_date: string;
    village_id: string;
    active: boolean;
    created_at: string;
    modified_at: string;
    created_by: string;
    modified_by: string;
}

export interface Applicant {
    applicant_id: string;
    nationality: string;
    zip_code: string;
    user_id: string;
    applicant_ahemce: string;
    institution_id: string;
    sub_institution_id: string;
    position: string;
    jobs_contact: string;
    jobs_address: string;
    jobs_zip: string;
    jobs_email: string;
    last_education: string;
    jobs_fax: string;
    nip: string;
    institution: any;
    sub_institution: any;
    user: User;
}