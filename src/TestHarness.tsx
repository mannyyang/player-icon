import * as React from 'react';
import { Header } from 'semantic-ui-react';
import './TestHarness.css';
// Test harness Imports
import DocTemplate from 'player-doc-template';

// Icon Imports
import * as Manifest from './control/Manifest.json';
import Icon from './control/Icon';
import { IconNameType } from 'player-core-ui/types/IconNames';

// Layout Imports
import { GridLayout } from 'player-layout-controls/controls/GridLayout';
import { GridCol } from 'player-layout-controls/controls/GridCol';

class TestHarness extends React.Component<{}, {}> {

    findProperty(prop: string) {
        return Manifest.properties.find((property) => {
            return property.name === prop;
        }).enumValues;
    }

    renderIconGroup(property: string) {
        const iconProperties = {};
        const divStyles = {
            textAlign: 'center',
        };
        return (
            <GridLayout gutterHorizontal="Medium" gutterVertical="Medium" >
                {
                    this.findProperty(property).map((value: string, key: number) => {
                        if (property !== 'iconName') {
                            iconProperties[property] = value;
                            iconProperties['iconName'] = 'action';
                        }
                        return (
                            <GridCol key={key}>
                                <div style={divStyles} >
                                    <Icon iconName={value as IconNameType}{...iconProperties} /><br/>
                                    {value}
                                </div>
                            </GridCol>
                        );
                })}
            </GridLayout>
        ); 
    }

    render() {
        return (
            <div className="test-harness">
                <DocTemplate manifest={Manifest}>
                    <Header size="medium">Default Icon</Header>
                    <Icon iconName="action"/>

                    <Header size="medium">Icon Colors</Header>
                    {this.renderIconGroup('color')}

                    <Header size="medium">Icon Sizes</Header>
                    {this.renderIconGroup('size')}

                    <Header size="medium">Icon Types</Header>
                    {this.renderIconGroup('iconName')}

                    <Header size="medium">Icon Rotations</Header>
                    {this.renderIconGroup('rotationDegree')}

                    <Header size="medium">RTL Options</Header>
                    <button
                        onClick={() => {
                            if (!document.documentElement.getAttribute('dir')) {
                                document.documentElement.setAttribute('dir', 'rtl');
                            } else {
                                document.documentElement.removeAttribute('dir');
                            }
                            this.forceUpdate();
                        }}
                    >
                        Toggle RTL
                    </button>
                    <br/>
                    <Header size="medium">RTL Flip with no existing Rotation Degree</Header>
                    <Icon iconName="right-cursor" shouldFlipForRtl={true} />
                    <Header size="medium">Existing 180 Degree Flip with RTL Flip</Header>
                    <Icon iconName="right-cursor" rotationDegree="180" shouldFlipForRtl={true} />
                    <Header size="medium">Existing 180 Degree Flip no RTL Flip</Header>
                    <Icon iconName="right-cursor" rotationDegree="180"  />
                </DocTemplate>
            </div>
        );
    }
}

export default TestHarness;
