import { DespesasType } from "@/types/despesasType";
import { FormatedDespesas } from "@/types/formatedDespesas";
import { formatDespesas } from "@/utils/formatDespesas";
import './ContentTables.css'
import { despesasEnum } from "@/enums/despesasEnum";
import { deleteDespesas } from "@/utils/apiFetch";

import { Trash2 } from 'lucide-react'

type ContentTablesProps = {
    content: DespesasType,
    onToggle: () => void
}

function ContentTable({ content, onToggle }: ContentTablesProps) {
    const formatedContent: FormatedDespesas = formatDespesas(content);

    const handleDelete = (event: React.MouseEvent<HTMLButtonElement>, id: number) => {
        event.preventDefault();

        const controller = new AbortController;
        const signal = controller.signal;

        deleteDespesas(id, signal);

        onToggle();
    }

    return (
        <>
            <div className="flex mb-20">
                <div className="table">
                    <h1>Dinheiro</h1>
                    {formatedContent.grossArray.map((item, index)=>(
                        <div key={index}>
                            <p>{new Intl.NumberFormat('pt-BR', {style: 'currency',currency: 'BRL',}).format(item[1])}</p>
                            <p>{item[2]}</p>
                            <button className="px-1" onClick={e => handleDelete(e, item[0])}><Trash2 size={19}/></button>
                        </div>
                    ))}
                </div>
                <div className="table">
                    <h1>Pix</h1>
                    {formatedContent.pixArray.map((item, index)=>(
                        <div key={index}>
                            <p>{new Intl.NumberFormat('pt-BR', {style: 'currency',currency: 'BRL',}).format(item[1])}</p>
                            <p>{item[2]}</p>
                            <button className="px-1" onClick={e => handleDelete(e, item[0])}><Trash2 size={19}/></button>
                        </div>
                    ))}
                </div>
                <div className="table">
                    <h1>Vale</h1>
                    {formatedContent.voucherArray.map((item, index)=>(
                        <div key={index}>
                            <p>{new Intl.NumberFormat('pt-BR', {style: 'currency',currency: 'BRL',}).format(item[1])}</p>
                            <p>{item[2]}</p>
                            <button className="px-1" onClick={e => handleDelete(e, item[0])}><Trash2 size={19}/></button>
                        </div>
                    ))}
                </div>
                <div className="table">
                    <h1>Despesas</h1>
                    {formatedContent.netArray.map((item, index)=>(
                        <div key={index}>
                            <p>{despesasEnum[item[3]]}</p>
                            <p className="">{new Intl.NumberFormat('pt-BR', {style: 'currency',currency: 'BRL',}).format(item[1])}</p>
                            <p>{item[2]}</p>
                            <button className="px-1" onClick={e => handleDelete(e, item[0])}><Trash2 size={19}/></button>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex font-bold">
                <div className="bg-primary text-white rounded-lg p-2  ml-auto mr-10 text-center">
                    <p>Bruto</p>
                    <p>{new Intl.NumberFormat('pt-BR', {style: 'currency',currency: 'BRL',}).format(formatedContent.grossTotal)}</p>
                </div>
                <div className="bg-primary text-white rounded-lg p-2 mr-10 text-center">
                    <p>Pix</p>
                    <p>{new Intl.NumberFormat('pt-BR', {style: 'currency',currency: 'BRL',}).format(formatedContent.pixTotal)}</p>
                </div>
                <div className="bg-primary text-white rounded-lg p-2 mr-10 text-center">
                    <p>Vale</p>
                    <p>{new Intl.NumberFormat('pt-BR', {style: 'currency',currency: 'BRL',}).format(formatedContent.voucherTotal)}</p>
                </div>
                <div className="bg-primary text-white rounded-lg p-2 mr-auto text-center">
                    <p>Líquido</p>
                    <p>{new Intl.NumberFormat('pt-BR', {style: 'currency',currency: 'BRL',}).format(formatedContent.grossTotal - formatedContent.netTotal)}</p>
                </div>
                <div className="bg-primary text-white rounded-lg p-2 mr-auto text-center">
                    <p>Total</p>
                    <p>{new Intl.NumberFormat('pt-BR', {style: 'currency',currency: 'BRL',}).format(formatedContent.grossTotal - formatedContent.netTotal + formatedContent.pixTotal + formatedContent.voucherTotal)}</p>
                </div>
            </div>
        </>
    )
}

export default ContentTable;