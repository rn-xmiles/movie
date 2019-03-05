/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 * @author singcl <iambabyer@gmail.com>
 * @see https://github.com/singcl
 */

import * as React from 'react'
import * as RN from 'react-native'
import { never } from 'rxjs'

type Props = {}
type State = {}
export default class Home extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            //
        }
    }

    render() {
        return (
            <RN.View>
                <RN.Button title="测试" onPress={() => never} />
            </RN.View>
        )
    }
}
