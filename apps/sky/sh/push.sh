#!/bin/bash
###
 # @Author: gavinning gavinning@qq.com
 # @Date: 2025-02-26 12:05:30
 # @LastEditors: gavinning gavinning@qq.com
 # @LastEditTime: 2025-04-17 19:08:17
 # @FilePath: /vue-vben-admin/apps/sky/sh/push.sh
 # @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
###

name=admin
project=sky

version=$2
filename=$name-$version.tgz
pack=.cache/$filename

# help message
if [ ! $1 ] || [ $1 = "-h" ] || [ $1 = "--help" ] ; then
cat << EOF

  Usage:

    npm run push <domain> <version>
    bash $0 <domain> <version>

  Description:

    1、执行 npm run build 进行构建
    2、执行 npm run zip 进行版本打包

  Example:

    npm run push wang 0.1.0
    bash $0 wang 0.1.0


EOF
exit 0
fi

# check ssh
if [ ! $1 ] ; then
echo
echo "ssh no exist."
echo
exit 0
fi

# check pack is exist
if [ ! -f $pack ]; then
echo "$version no exist."
echo
exit 0
fi


# ------ Server ------
domain_wang=root@g2.wsd80.top
domain_mabing=root@m.max1234.top
domain_yehua=root@data64.top

env_var="domain_$1"
eval "env_value=\$$env_var"
# ------ Server end ------

domain=$(echo "$env_value" | tr -d '\n\r')

# check ssh
if [ -z "$domain" ]; then
  echo
  echo "domain does not exist."
  echo
  exit 0
fi

echo domain: $domain
echo
# ------ deploy ------

# ssh
sky=/data/app/$project/$name
target=$sky/$filename

ssh $domain "mkdir -p $sky"
scp $pack $domain:$target
scp sh/deploy.sh $domain:$sky
scp sh/rollback.sh $domain:$sky
ssh $domain "$sky/deploy.sh $target"


echo "deploy $filename => $domain:$target"

# ------ deploy end ------
