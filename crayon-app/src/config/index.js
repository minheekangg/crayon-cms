import WidgetConfig from './widget-config';
import BitConfig from './bit-config';

const config = {
    clientName: 'Mike\'s Company',
    moduleOrder: ['bits', 'widgets'],
    modules: {
        widgets: WidgetConfig,
        bits: BitConfig
    }
};

export default config;