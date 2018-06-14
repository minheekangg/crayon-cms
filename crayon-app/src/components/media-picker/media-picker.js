import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone'

import config from 'config';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import Spinner from 'components/spinner';
import MediaFilters from 'components/media-filters';

export default class MediaPicker extends React.PureComponent {
    static propTypes = {
        open: PropTypes.bool,
        fetched: PropTypes.bool,
        fetching: PropTypes.bool,
        items: PropTypes.array,
        actions: PropTypes.shape({
            close: PropTypes.func.isRequired,
            select: PropTypes.func.isRequired,
            clickItem: PropTypes.func.isRequired,
            fetch: PropTypes.func.isRequired,
            upload: PropTypes.func.isRequired
        }).isRequired
    };

    componentWillMount() {
        const { actions: { fetch } } = this.props;
        fetch();
    }

    mapMedia() {
        const { fetched, items, selectedItem, actions: { clickItem } } = this.props;

        if (!fetched) {
            return <p><Spinner /> Loading media...</p>;
        }

        return items.map((item) => {
            const classes = ['media-item'];

            if (selectedItem && selectedItem.id === item.id) {
                classes.push('selected');
            }
            return (
                <div key={`media-item-${item.id}`} onClick={() => clickItem(item)} className={classes.join(' ')}>
                    <img src={`${config.uploadFullPath}/${item.filename}`} alt="Media picker item" />
                </div>
            );
        });
    }

    render() {
        const { fetched, open, selectedItem, actions: { close, select, upload } } = this.props;

        return (
            <Modal className="media-picker" isOpen={open} toggle={() => close()}>
                <ModalHeader toggle={() => close()}>
                    Media Picker
                </ModalHeader>
                <ModalBody>
                    <MediaFilters />
                    <div className="media-grid">
                        <Dropzone className="file-drop-zone" acceptStyle={{border: '2px solid green'}} onDrop={(files) => upload(files)}>
                            <div>Drag files here or click to select</div>
                        </Dropzone>

                        {this.mapMedia()}
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => select(selectedItem.filename)} disabled={!selectedItem || !fetched}>Select</Button>
                    <Button color="secondary" onClick={() => close()}>Cancel</Button>
                </ModalFooter>
            </Modal>
        );
    }
}