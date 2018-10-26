# 空中研发-企业名片小程序

* 正常页面

```bash
export default class pageName extends wepy.page{}
```

* 必须录入手机号的页面结构

```bash
import auth from '../base/auth'

export default class pageName extends auth{}
```