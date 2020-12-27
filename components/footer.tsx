import React from 'react';

import '../styles/footer.less';

export default class Footer extends React.Component {
    public render(): React.ReactNode {
        return (
            <footer>
                &copy;&nbsp;Copyright&nbsp;<a target="_blank" href="https://frydlewicz.pl">Kamil&nbsp;Frydlewicz</a>&nbsp;{(new Date()).getFullYear()}
            </footer>
        );
    }
}
