import * as React from 'react';
import './Icon.css';
import { IconNameType } from 'player-core-ui/types/IconNames';

export interface IconProps {
    ariaHidden?: boolean;
    color?: string;
    iconName: IconNameType;
    isWidthFixed?: boolean;
    shouldFlipForRtl?: boolean;
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
        isWidthFixed: false,
        shouldFlipForRtl: false,
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
        this.findRotationDegreeClass = this.findRotationDegreeClass.bind(this);
    }

    generateClasses(): string {
        const {
            color,
            iconName,
            isWidthFixed,
            size,
        } = this.props;

        return [
            'p-icon',
            this.constructClass(iconName, 'p-icon'),
            this.constructClass(size, 'p-f-sz'),
            this.constructClass(color, 'p-t'),
            this.findRotationDegreeClass(),
            isWidthFixed && 'p-icon-fixed-width',
        ].filter(Boolean).join(' ');
    }

    findRotationDegreeClass(): string {
        const {
            shouldFlipForRtl,
            rotationDegree,
        } = this.props;
        
        const isRtlIconFlippable =  document.documentElement.getAttribute('dir') === 'rtl' && shouldFlipForRtl;

        if (rotationDegree === '180' && isRtlIconFlippable) {
            return '';
        }
        
        if (rotationDegree) {
            // rotate based on rotationDegree prop
            return this.constructClass(rotationDegree, 'p-rotate');
        }

        if (!rotationDegree && isRtlIconFlippable) {
            return this.constructClass('180', 'p-rotate');
        }

        return '';
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
