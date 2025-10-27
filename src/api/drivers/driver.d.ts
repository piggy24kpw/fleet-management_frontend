type Driver = {
    id?: string,
    created_at?: string,
    updated_at?: string,
    user_id?: string,
    license_number: string,
    license_expiry: string,
    license_type: string,
    status: active | avability
}