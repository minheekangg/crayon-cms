import React from 'react';
import PropTypes from 'prop-types';
import config from 'config';

import { Button } from 'reactstrap';
import { faTrash, faBars } from '@fortawesome/fontawesome-free-solid';

import Icon from 'components/icon';

export default class FieldMultiValue extends React.PureComponent {
    static propTypes = {
        name: PropTypes.string.isRequired,
        allValue: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.string
        ]).isRequired,
        actions: PropTypes.shape({
            setItemProp: PropTypes.func.isRequired,
            setMultiItemProp: PropTypes.func.isRequired
        }).isRequired
    };

    render() {
        const { allValue } = this.props;

        if (!allValue || !allValue.length || typeof allValue === 'string') {
            return null;
        }

        return (
            <ul className="field-multi-values">
                {allValue.map((item, i) => {
                    return (
                        <li key={`multi-item-${i}`}>
                            <div className="item-thumb"><img src={`${config.uploadFullPath}/${item}`} alt="item thumb" /></div>
                            <div className="item-name">{item}</div>
                            <div className="btns">
                                <div className="drag-handle"><Icon icon={faBars} /></div>
                                <Button color="danger"><Icon icon={faTrash} /></Button>
                            </div>
                        </li>
                    );
                })}
            </ul>
        );
    }
}