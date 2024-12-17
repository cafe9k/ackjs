npm install

if [[ ! -d "./logs/MangoTranslate" ]];
    then
        path="./logs/MangoTranslate"
        echo "  mkdir -p ${path}"
        mkdir -p ${path}
fi
    echo "  pm2 delete MangoTranslate"
    pm2 delete MangoTranslate 2>/dev/null 1>/dev/null

pm2 start src/server/index.js\
    --name MangoTranslate\
    --merge-logs\
    --log-date-format="YYYY-MM-DD HH:mm:ss"\
	--log ./logs/MangoTranslate/outerr.log\
	--output ./logs/MangoTranslate/out.log\
	--error ./logs/MangoTranslate/err.log
