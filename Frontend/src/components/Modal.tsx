import { useState } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { postDespesas } from '@/utils/apiFetch';

type ModalProps = {
    onToggle: () => void
}

export default function Modal({ onToggle }: ModalProps){
    const [value, setValue] = useState(0);
    const [type, setType] = useState("dinheiro");
    const [day, setDay] = useState("");

    return (
        <AlertDialog>
            <AlertDialogTrigger className="p-2 rounded-lg bg-primary text-white font-medium">Criar Novo</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Crie uma nova entrada:</AlertDialogTitle>
                        <div>
                            <form>
                                <input type="number" step="any" required value={value} onChange={(e)=> setValue(e.target.valueAsNumber)}/>
                                <select onChange={(e)=>{
                                    e.preventDefault()
                                    setType(e.target.value)
                                    }} placeholder='Tipo'>
                                    <option value="dinheiro">Dinheiro</option>
                                    <option value="vale">Vale</option>
                                    <option value="pix">Pix</option>
                                    <option value="cobrador">Cobrador</option>
                                    <option value="motorista">Motorista</option>
                                    <option value="manutencao">Manutenção</option>
                                    <option value="diesel">Diesel</option>
                                </select>
                                <input type="date" onChange={e => setDay(e.target.value)}/>
                            </form>
                        </div>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={()=>{
                        const controller = new AbortController();
                        const signal = controller.signal;
                        const despesa = {value, type, day};

                        postDespesas(despesa, signal).then(()=> {
                            onToggle();
                        }).catch((err)=> {
                            console.log(`Aborting fetch! ${err}`)
                        })

                        return () => {controller.abort()};
                        }}>Criar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}