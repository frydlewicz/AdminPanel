import React from 'react';
import Link from 'next/link';

import styles from '../styles/navbar.less';

export default class Navbar extends React.Component {
    public render(): React.ReactNode {
        return (
            <nav>
                <div className={styles.top}></div>
                <ul>
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>
                        <Link href="/health">Health check</Link>
                    </li>
                    <li>
                        <Link href="/stats">Statistics</Link>
                    </li>
                </ul>
            </nav>
        );
    }
}
