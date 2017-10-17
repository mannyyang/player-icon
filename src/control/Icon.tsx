import * as React from 'react';
import './Icon.css';

export type IconNameType = 
    'action' |
    'add' |
    'alert-round-1' |
    'alert-round-2' |
    'alert-triangle' |
    'badge' |
    'bell' |
    'bin' |
    'bookmark' |
    'button' |
    'calendar' |
    'cart' |
    'check' |
    'checkmark' |
    'clock' |
    'cross' |
    'down-arrow-bar' |
    'down-arrows' |
    'down-triangle' |
    'expand' |
    'gear' |
    'globe' |
    'hat' |
    'horizontal-stroke' |
    'horizontal-three-lines' |
    'hourglass' |
    'house' |
    'information' |
    'LinkedIn' |
    'location' |
    'lock' |
    'magnifying-glass' |
    'papers' |
    'pause' |
    'pencil' |
    'person-empty' |
    'person-half' |
    'person' |
    'phone-export' |
    'play' |
    'right-cursor' |
    'Seek' |
    'star-empty' |
    'star-half' |
    'star' |
    'sun' |
    'three-dots' |
    'three-lists' |
    'three-scrolls' |
    'two-curved-arrows' |
    'two-squares-one-line' |
    'two-squares' |
    'up-arrow-bar' |
    'up-down-triangles';

export interface IconProps {
    ariaHidden?: boolean;
    color?: string;
    iconName?: IconNameType;
    isWidthFixed?: boolean;
    role?: string;
    rotationDegree?: string;
    size?: string;
    tag?: string;
    tooltip?: string;
}

class Icon extends React.Component<IconProps, undefined> {
    static defaultProps = {
        ariaHidden: false,
        color: 'Default',
        iconName: 'action',
        isWidthFixed: false,
        role: '',
        rotationDegree: '',
        size: 'Medium',
        tag: null,
        tooltip: null,
    };

    constructor(props: IconProps) {
        super(props);

        this.generateClasses = this.generateClasses.bind(this);
        this.constructClass = this.constructClass.bind(this);
        this.customizeEnums = this.customizeEnums.bind(this);
    }

    generateClasses(): string {
        const {
            color,
            iconName,
            isWidthFixed,
            rotationDegree,
            size,
        } = this.props;

        return [
            'p-icon',
            this.constructClass(iconName, 'p-icon'),
            this.constructClass(size, 'p-f-sz'),
            this.constructClass(color, 'p-t'),
            rotationDegree && this.constructClass(rotationDegree, 'p-rotate'),
            isWidthFixed && 'p-icon-fixed-width',
        ].filter(Boolean).join(' ');
    }

    constructClass(prop: string | null | undefined, prefix: string): string {
        if (prop && prop !== 'None') {
            const customProp = this.customizeEnums(prop);
            return `${prefix}-${customProp}`;
        }
        return '';
    }

    customizeEnums(en: string): string {
        const cases = {
            'Xsmall': 'xs',
            'Small': 'sm',
            'Medium': 'md',
            'Large': 'lg',
            'Xlarge': 'xl',
            'Xlarge2': '2x',
            'Xlarge3': '3x',
            'Xlarge4': '4x',
            'Primary': 'Primary50',
            'Secondary': 'Secondary50',
            'Success': 'Success50',
            'Warning': 'Warning50',
            'Error': 'Error50',
            'Info': 'Info50',
        };

        return cases[en]
            ? cases[en].toLowerCase()
            : en.toLowerCase();
    }

    render() {
        const {
            tooltip,
            tag,
            ariaHidden,
            role
        } = this.props;

        const attrs = {};
        
        if (tag !== null) {
            attrs['data-tag'] = tag;
        }
        
        if (tooltip !== null) {
            attrs['title'] = tooltip;
        }
        
        return (
            <i
                {...{
                    className: this.generateClasses(),
                    ...attrs,
                    'aria-hidden': ariaHidden,
                    role,
                }}
            />
        );
    }
}

export default Icon;
