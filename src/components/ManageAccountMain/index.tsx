'use client';
import { useForm } from "react-hook-form";
import Input from "../Input";
import { z } from 'zod';
import { useContext, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill, BsFillArrowDownCircleFill, BsFillArrowUpCircleFill } from 'react-icons/bs';
import { DashboardContext } from "../../providers/DashboardProvider";

export default function ManageAccountMain({ userData, updateUser }) {

    const [sUsername, setSUsername] = useState(false);
    const [sFullName, setSFullName] = useState(false);
    const [sPassword, setSPassword] = useState(false);
    const [sEmail, setSEmail] = useState(false);
    const [sSecEmail, setSSecEmail] = useState(false);
    const [sPhone, setSPhone] = useState(false);
    const [sSecPhone, setSSecPhone] = useState(false);

    const { register, handleSubmit } = useForm();

    return (
        <main>
            <h3>Atualize seus dados!</h3>
            <form onSubmit={handleSubmit(updateUser)}>
                <div>
                    {sUsername === false ? (
                        <button type="button" onClick={() => setSUsername(true)}>Atualizar nome cadastral <BsFillArrowDownCircleFill /></button>
                    ) : (
                        <>
                            <button type="button" onClick={() => setSUsername(false)}>Não atualizar<BsFillArrowUpCircleFill /></button>
                            <Input label={'Atualize seu nome cadastral'} placeholder={userData.username}
                                type={'text'} {...register('username')}
                            />
                        </>
                    )}
                </div>
                <div>
                    {sFullName === false ? (
                        <button type="button" onClick={() => setSFullName(true)}>Atualizar o nome completo <BsFillArrowDownCircleFill /></button>
                    ) : (
                        <>
                            <button type="button" onClick={() => setSFullName(false)}>Não atualizar <BsFillArrowUpCircleFill /></button>
                            <Input label={'Atualize seu nome completo'} placeholder={userData.full_name}
                                type={'text'} {...register('full_name')}
                            />
                        </>
                    )}
                </div>
                <div>
                    {sPassword === false ? (
                        <button type="button" onClick={() => setSPassword(true)}>Atualizar a senha <BsFillArrowDownCircleFill /></button>
                    ) : (
                        <>
                            <button type="button" onClick={() => setSPassword(false)}>Não atualizar <BsFillArrowUpCircleFill /></button>
                            <Input label={'Atualize sua senha'} placeholder={'digite sua nova senha'}
                                type={'text'} {...register('password')}
                            />
                        </>
                    )}
                </div>
                <div>
                    {sEmail === false ? (
                        <button type="button" onClick={() => setSEmail(true)}>Atualizar e-mail principal <BsFillArrowDownCircleFill /></button>
                    ) : (
                        <>
                            <button type="button" onClick={() => setSEmail(false)}>Não atualizar <BsFillArrowUpCircleFill /></button>
                            <Input label={'Atualize seu e-mail principal'} placeholder={userData.emails[0].email || null}
                                type={'text'} {...register('email')}
                            />
                        </>
                    )}
                </div>
                <div>
                    {sSecEmail === false ? (
                        <button type="button" onClick={() => setSSecEmail(true)}>Atualizar e-mail opcional <BsFillArrowDownCircleFill /></button>
                    ) : (
                        <>
                            <button type="button" onClick={() => setSSecEmail(false)}>Não atualizar <BsFillArrowUpCircleFill /></button>
                            <Input label={'Atualize seu e-mail opcional'} placeholder={userData.emails[1]?.email || 'digite seu e-mail opcional'}
                                type={'text'} {...register('second_email')}
                            />
                        </>
                    )}
                </div>
                <div>
                    {sPhone === false ? (
                        <button type="button" onClick={() => setSPhone(true)}>Atualizar telefone <BsFillArrowDownCircleFill /></button>
                    ) : (
                        <>
                            <button type="button" onClick={() => setSPhone(false)}>Não atualizar <BsFillArrowUpCircleFill /></button>
                            <Input label={'Atualize seu telefone'} placeholder={userData.phones[0].phone || null}
                                type={'text'} {...register('phone')} maxLength={11}
                            />
                        </>
                    )}
                </div>
                <div>
                    {sSecPhone === false ? (
                        <button type="button" onClick={() => setSSecPhone(true)}>Atualizar telefone opcional <BsFillArrowDownCircleFill /></button>
                    ) : (
                        <>
                            <button type="button" onClick={() => setSSecPhone(false)}>Não atualizar <BsFillArrowUpCircleFill /></button>
                            <Input label={'Atualize seu telefone opcional'} placeholder={userData.phones[1]?.phone || 'digite seu telefone opcional'}
                                type={'text'} {...register('username')} maxLength={11}
                            />
                        </>
                    )}
                </div>
                <button type='submit'>Atualizar dados</button>
            </form>
        </main>
    )
};