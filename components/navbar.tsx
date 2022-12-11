import React from 'react';
import Link from 'next/link';

import styles from '../styles/navbar.module.less';

export default class Navbar extends React.Component {
    public render(): React.ReactNode {
        return (
            <nav className={styles.nav}>
                <div className={styles.top}></div>
                <ul>
                    <li>
                        <Link href="/">
                            <a>
                                <img src="/home.svg" alt="" />
                                <span>Home</span>
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/health">
                            <a>
                                <img src="/health.svg" alt="" />
                                <span>Health check</span>
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/stats">
                            <a>
                                <img src="/stats.svg" alt="" />
                                <span>Statistics</span>
                            </a>
                        </Link>
                    </li>
                </ul>
            </nav>
        );
    }
}
