import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';
import checkConfigFile from 'utils/check-config';

import config from 'config';

import Spinner from 'components/spinner';

import AddNew from 'components/add-new';
import FilterSortSearch from 'components/filter-sort-search';
import Switchers from 'components/switchers';
import CurrentView from 'components/current-view';
import Paginator from 'components/paginator';
import RecordCount from 'components/record-count';
import ItemModal from 'components/item-modal';
import BulkAdd from 'components/bulk-add';

export default class Main extends React.PureComponent {
    static propTypes = {
        fetched: PropTypes.bool,
        fetching: PropTypes.bool,
        error: PropTypes.bool,
        actions: PropTypes.shape({
            fetchItems: PropTypes.func.isRequired
        }).isRequired
    };

    componentWillMount() {
        const { fetched, fetching, actions: { fetchItems } } = this.props;

        if (!fetched && !fetching) {
            fetchItems();
        }
    }

    render() {
        const configInValid = checkConfigFile();

        if (configInValid) {
            return <Alert color="danger">There are errors in the config file. See console.</Alert>;
        }

        const { pluginName, pluginVersion } = config;

        const pluginVersionText =   pluginVersion
                                    ? <p><strong>v{pluginVersion}</strong></p>
                                    : null;

        const { fetched, error } = this.props;

        if (!fetched) {
           return <p><Spinner /> Loading items...</p>;
        }

        if (error) {
            const { itemName, itemNamePlural: itemP } = config;

            const itemNamePlural = itemP ? itemP : itemName + 's';
            return <Alert color="danger">Error loading {itemNamePlural.toLowerCase()}</Alert>;
        }

        return (
            <div>
                <h1>{pluginName}</h1>
                {pluginVersionText}

                <AddNew />
                <FilterSortSearch />
                <Switchers />
                <CurrentView />
                <Paginator />
                <RecordCount />
                <ItemModal />
                <BulkAdd />
            </div>
        );
    }
}