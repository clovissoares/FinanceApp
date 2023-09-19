

export type DespesasType = {
    data: [
        {
            id: number,
            attributes: {
                type: string,
                value: number,
                day: string,
                createdAt: string,
                updatedAt: string,
            }
        }
    ],
    meta: {
        pagination?:{
            page: number,
            pageSize: number,
            pageCount: number,
            total: number
        }
    }
    error?:{
        status: number,
        name: string,
        message: string,
        details?:{}
    }
};