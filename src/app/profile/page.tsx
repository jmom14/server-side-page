import { auth } from '@/lib/auth';
import React from 'react'
import Image from "next/image";
import styles from "./profile.module.css";
import contactStyles from "../contact/contact.module.css";

export default async function page() {

    const session = await auth();
    if (!session || !session.user) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }

    console.log(session.user);
    const { name, email, image } = session.user;

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Profile</h1>
            <div className={contactStyles.form}>
                <input type="text" value={name || ''} />
                <input type="text" value={email || ''} />
            </div>
        </div>
    )
}
