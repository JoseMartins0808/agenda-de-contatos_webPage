import { useForm } from "react-hook-form";
import Input from "../Input";

export function UpdateContactModal({ contact, setModal }) {

    console.log(contact);

    const { register, handleSubmit } = useForm();

    function updateContact(data) {
        console.log(data);
    }

    return (
        <dialog open>
            <div>
                <h3>Atualizar Contato</h3>
                <form onSubmit={handleSubmit(updateContact)}>
                    <Input label={'Atualize o nome do contato ' + contact[0].full_name} placehokder={'digite o novo nome do contato'}
                        type={'text'} {...register('full_name')} />
                    <Input label={'Atualize o email do contato'} placehokder={'digite o novo email do contato'}
                        type={'text'} {...register('emails')} />
                    <Input label={'Atualize o email opcional do contato'} placehokder={'digite o novo email opcional do contato'}
                        type={'text'} {...register('emails')} />
                    <Input label={'Atualize o telefone do contato'} placehokder={'digite o novo telefone do contato'}
                        type={'text'} {...register('phones')} />
                    <Input label={'Atualize o telefone opcional do contato'} placehokder={'digite o novo telefone opcional do contato'}
                        type={'text'} {...register('phones')} />
                    <div>
                        <button type='submit'>Atualizar</button>
                        <button type='button' onClick={() => setModal(false)}>Cancelar</button>
                    </div>
                </form>
            </div>
        </dialog>
    )
};