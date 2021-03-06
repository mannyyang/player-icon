import * as React from 'react';
import Icon from '../src/control/Icon';
import { shallow, mount } from 'enzyme';
import { CSODSpecRunner } from './utilities/csod.spec.runner';

let data = require('../src/control/Manifest.json');
let matcher = require('./icon.spec.json');

const metadata = data['properties'];
const properties: any = [];
for (var i=0; i< metadata.length;i++) {
    var p = { "name": metadata[i].name, "type": metadata[i].type, "defaultValue": metadata[i].defaultValue };
    properties.push(p);
}

describe('Unit Tests', () => {
    properties.map(function (properties: any) {
        const wrapper = mount(<Icon iconName='action' />);
        it('That it has a property named: ' + properties.name, function () {
            expect(wrapper.prop(properties.name)).toBeDefined();
        })
        //check if a default value is defined and it is set at the component
        if (properties.defaultValue != null && properties.defaultValue != "") {
            it('That the property: <' + properties.name + '> has a default value of: ' + properties.defaultValue, function () {
                expect(wrapper.prop(properties.name)).toBe(properties.defaultValue);
            });
        }
    });
});

describe('Spec Runner Tests', () => {
    let _specRunner = new CSODSpecRunner(metadata, matcher);
    let _specs = _specRunner.getMatchers();
    for (var m = 0; m < _specs.length; m++) {
        (function (testSpec) {
            it(testSpec.message, function () {
                //var _propertyName = testSpec.propertyName;
                var dynamicProps = {};
                dynamicProps = testSpec.properties;
                var wrapper = shallow(<Icon iconName="action" {...dynamicProps} />);
                expect(wrapper.find('i').hasClass(testSpec.matcherValue)).toBe(true);
            });
        })(_specs[m]);
    };
});

describe('Icon Functional Test', function () {
    it('That the data-tag attribute exists and is set properly when property tag is set to "test"', function () {
        const wrapper = shallow(<Icon iconName='action' tag="test" />);
        expect(wrapper.find('i').prop("data-tag")).toBe("test");
    });

    it('That the title attribute exists and is set properly when property tooltip is set to "tool tip"', function () {
        const wrapper = shallow(<Icon iconName='action' tooltip="tool tip" />);
        expect(wrapper.find('i').prop("title")).toBe("tool tip");
    });

    it('That the className prop on the icon has the 180 degree classname', function () {
        const wrapper = shallow(<Icon iconName='action' rotationDegree="180" />);
        const classNameProperty = wrapper.find('i').prop("className") || '';
        expect(classNameProperty.includes('p-rotate-180')).toBe(true);
    });
});
