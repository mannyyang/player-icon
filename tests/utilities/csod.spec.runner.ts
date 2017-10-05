enum MatcherType {
    enumLookup = 1,
    customLookup,
    attribute,
    style,
    text
}

export class CSODSpecRunnerItem {
    message: string;
    matcherValue: string;
    propertyName: string
    propertyValue: string;
    matcherType: MatcherType;
    properties: any;

    constructor(message: string, propName: string, propValue: string, value: string, matcherType: MatcherType, properties: any) {
        this.message = message;
        this.propertyName = propName;
        this.propertyValue = propValue;
        this.matcherValue = value;//change name makes no sense
        this.matcherType = matcherType;
        this.properties = properties;
    }
}

export class CSODSpecRunner {
    manifest: Array<any>;
    matchers: Array<any>;
    items: Array<CSODSpecRunnerItem>;

    constructor(manifest: Array<any>, matchers: any) {
        this.manifest = manifest;
        this.matchers = matchers;
    }
    getMatchers() {
        this.items = new Array<CSODSpecRunnerItem>();
        for (var m=0; m< this.matchers.length; m++) {
            switch (this.matchers[m].matcherType.toString()) {
                case "enumLookup": {
                    handleEnumLookup(this.manifest, this.matchers[m], this.items);
                    break;
                }
                case "customLookup": {
                    handleCustomEnumLookup(this.matchers[m], this.items);
                    break;
                }
                case "style": {

                }
                case "attribute": {
                }
            }
        }
        return this.items;
    }
}

function handleEnumLookup(manifest: Array<any>, matcher: any, items: Array<CSODSpecRunnerItem>) {
    for (var p = 0; p < manifest.length; p++) {
        if (manifest[p].name == matcher.propertyName) {
            if (manifest[p].enumValues != null) {
                var _format = matcher.format;
                var _process = true;
                for (var e = 0; e < manifest[p].enumValues.length; e++) {
                    var propertyValue = manifest[p].enumValues[e];
                    var propertyName = matcher.propertyName;
                    var matcherValue = propertyValue;
                    //check if exclude exists
                    if (matcher.exclude != null) {
                        if (matcher.exclude.indexOf(propertyValue) > -1)
                            _process = false;
                    }
                    if (_process) {
                        if (matcher.type == "lowercase") {
                            matcherValue = propertyValue.toLowerCase();
                        }
                        if (matcher.type == "string-replace" && _format != null) {
                            matcherValue = _format.split('${value}').join(matcherValue);
                        }
                        if (matcher.type == "string-replace-lowercase" && _format != null) {
                            matcherValue = _format.split('${value}').join(matcherValue).toLowerCase();
                        }
                        var dynamicProps = {};
                        if (matcher.properties != null) {
                            for (var i = 0; i < matcher.properties.length; i++) {
                                dynamicProps[matcher.properties[i].name] = matcher.properties[i].value;
                            }
                        }
                        dynamicProps[propertyName] = propertyValue;
                        items.push(addSpecRunnerItem(propertyName, propertyValue, matcherValue, MatcherType.enumLookup, dynamicProps));
                    }
                }
            }
        }
    }
}

function handleCustomEnumLookup(matcher: any, items: Array<CSODSpecRunnerItem>) {
    var propertyName = matcher.propertyName;
    
    for (var m = 0; m < matcher.list.length; m++) {
        var matcherValue = matcher.list[m].value;
        var propertyValue = matcher.list[m].name;
        var dynamicProps = {};
        if (matcher.properties != null) {
            for (var i = 0; i < matcher.properties.length; i++) {
                dynamicProps[matcher.properties[i].name] = matcher.properties[i].value;
            }
        }
        dynamicProps[propertyName] = propertyValue;
        items.push(addSpecRunnerItem(propertyName, propertyValue, matcherValue, MatcherType.customLookup, dynamicProps));
    }
}

function addSpecRunnerItem(propertyName: string, propertyValue: string, matcherValue: string, matchertype: MatcherType, properties: any) {
    //use diferent templates depending on the matcher type (switch)
    var message = enumLookupTemplate(propertyName, propertyValue, matcherValue);
    let _item = new CSODSpecRunnerItem(message, propertyName, propertyValue, matcherValue, matchertype, properties);
    return _item;
}

function enumLookupTemplate(a: string, b: string, c: string) {
    //make this more flexible
    return `Validates the CSS "${a}" class Name for the "${b}" property to be ".${c}"`
    //  return  `This is an ${a} for ${a} purposes: ${b}`;
}
