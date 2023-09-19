import { DespesasType } from "@/types/despesasType"
import { FormatedDespesas } from "@/types/formatedDespesas"
import { formatDate } from "./formatDate";

export const formatDespesas = (content: DespesasType) => {
    let grossTotal = 0, netTotal = 0, pixTotal = 0, voucherTotal = 0;
    let grossArray: [number, number,string][] = [];
    let voucherArray: [number, number,string][] = [];
    let netArray: [number, number,string, string][] = [];
    let pixArray: [number, number,string][] = [];

    content.data.map( (item) => {
        if (item.attributes.type === 'dinheiro'){
            grossTotal = grossTotal + item.attributes.value;
            grossArray = [...grossArray, [item.id, item.attributes.value, formatDate(item.attributes.day)]];
        } 
        else if (item.attributes.type === 'pix'){
            pixTotal = pixTotal + item.attributes.value;
            pixArray = [...pixArray, [item.id, item.attributes.value, formatDate(item.attributes.day)]];
        }
        else if (item.attributes.type === 'vale'){
            voucherTotal = voucherTotal + item.attributes.value;
            voucherArray = [...voucherArray, [item.id, item.attributes.value, formatDate(item.attributes.day)]];
        }
        else {
            netTotal = netTotal + item.attributes.value;
            netArray = [...netArray, [item.id, item.attributes.value, formatDate(item.attributes.day), item.attributes.type]];
        }
    })

    const despesas: FormatedDespesas = {
        grossTotal, 
        netTotal, 
        pixTotal, 
        voucherTotal,
        grossArray,
        voucherArray,
        netArray,
        pixArray
    };

    return despesas;
}