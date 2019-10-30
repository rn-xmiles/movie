# vscode 开发 RN 常见错误指南

### 1

```sh
Cannot read property 'State' of undefined
```

```sh
null is not an object (evaluating 'rngesturehandlermodule.state')
```

原因: 部分功能使用到了原生库，而原生库未链接

解决方法：

```sh
# 方法一
# 安装错误提示中的库为项目依赖
react-native link

# 方法二
# 错误提示的库可以已经被其他库依赖安装
# 则直接link 具体的库。本项目错误提示的为 react-native-gesture-handler
react-native link react-native-gesture-handler
```

@see: https://reactnative.cn/docs/linking-libraries-ios.html

### 2

```sh
What went wrong:
Could not compile settings file 'C:\Users\singcxx\Desktop\rn-xmiles\movie\android\settings.gradle'.
> startup failed:
  settings file 'C:\Users\singcxx\Desktop\rn-xmiles\movie\android\settings.gradle': 3: unexpected char: '\' @ line 3, column 133.
     s\react-native-gesture-handler\android')
                             ^
```

原因: `react-native link` 后 settings.gradle 中的路径分隔符不正确。系统差异？

解决方法：

```sh
# 修改前
project(':react-native-gesture-handler').projectDir = new File(rootProject.projectDir, '..\node_modules\react-native-gesture-handler\android')

# 修改后
project(':react-native-gesture-handler').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-gesture-handler/android')
```

### 3

```sh
React Native Version Mismatch
```

解决办法：

```sh
Close all terminals and run build again.
```

### 4

问题：Hot Reload 不生效
方法：摇一摇打开 DEBUG 菜单；点击 Enable HotReload

### 5

```js
// 引入组件
import { BorderlessButton } from 'react-native-gesture-handler'
```

问题：BorderlessButton 组件的 onPress 事件不生效

解决方案：

第一步：

```sh
react-native link react-native-gesture-handler
```

第二步：

```java
// 安卓设备修改 C:\Users\xxx\Desktop\rn-xmiles\movie\android\app\src\main\java\com\movie\MainActivity.java

package com.swmansion.gesturehandler.react.example;

import com.facebook.react.ReactActivity;
+ import com.facebook.react.ReactActivityDelegate;
+ import com.facebook.react.ReactRootView;
+ import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

public class MainActivity extends ReactActivity {

  @Override
  protected String getMainComponentName() {
    return "Example";
  }

+  @Override
+  protected ReactActivityDelegate createReactActivityDelegate() {
+    return new ReactActivityDelegate(this, getMainComponentName()) {
+      @Override
+      protected ReactRootView createRootView() {
+       return new RNGestureHandlerEnabledRootView(MainActivity.this);
+      }
+    };
+  }
}
```

OK.
@see react-native-gesture-handler 文档： https://kmagiera.github.io/react-native-gesture-handler/docs/getting-started.html

### 6

RN 中使用 cherrio 一定是要 **v0.22.0**

```sh
yarn add cheerio@0.22.0
```

@see https://www.jianshu.com/p/ddf574337c47

### 7

```bash
FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task ':app:packageRelease'.
> com.android.ide.common.signing.KeytoolException: Failed to read key my-key-alias from store "C:\Users\your\Desktop\rn-xmiles\movie\android\app\my-release-key.keystore": Keystore was tampered with, or password was incorrect

* Try:
Run with --stacktrace option to get the stack trace. Run with --info or --debug option to get more log output. Run with --scan to get full insights.

* Get more help at https://help.gradle.org

BUILD FAILED in 2m 9s
81 actionable tasks: 29 executed, 52 up-to-date
```

解决：~/.gradle/gradle.properties（全局配置，对所有项目有效）与 项目目录/android/gradle.properties（项目配置，只对所在项目有效）中配置的密码不一致

### 8

如果没有配置秘钥，`$ ./gradlew assembleRelease` 会生成没有签名的 APK，这个包安装会不成功。所以要先签名。

### 9

按官方文档配置签名时候

```java
    buildTypes {
        release {
            signingConfig signingConfigs.release
        }
    }
```

这一段一定不要忘记写进去，不然还是会生成没有签名的 APK
