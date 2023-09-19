import { DespesasType } from "@/types/despesasType";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";

type PostDespesa = {
    value: number,
    type: string,
    day: string
}

export const getDespesas = async (date: DateRange, signal: AbortSignal) => {

    if(date.from && date.to){
    const response = await fetch(
        `http://127.0.0.1:1337/api/despesas?filters[$and][0][day][$gte]=${format(date.from,'yyyy-MM-dd')}&filters[$and][1][day][$lte]=${format(date.to,'yyyy-MM-dd')}`
        ,{
            method:"GET",
            headers: {
            "Content-Type": "application/json",
            },
            signal
        }
        );

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    
        const data: DespesasType = await response.json();
    
        return data;
    } else {
        return undefined;
    }
}

export const postDespesas = async (despesa: PostDespesa, signal: AbortSignal) => {

    const requestBody = {
        data:{
            value: despesa.value,
            type: despesa.type,
            day: despesa.day
        }
    }
    console.log(requestBody);
    const response = await fetch(
        `http://127.0.0.1:1337/api/despesas`
        ,{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
            signal
        }
        );

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    
        const data: DespesasType = await response.json();
    
        return data;
}

export const deleteDespesas = async (id: number, signal: AbortSignal) => {

    const response = await fetch(
        `http://127.0.0.1:1337/api/despesas/${id}`
        ,{
            method:"DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            signal
        }
        );

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    
        const data: DespesasType = await response.json();
    
        return data;
}