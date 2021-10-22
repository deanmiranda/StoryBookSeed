echo "========== Building =========="
echo ""

node tools/pre-build.js & webpack & node tools/post-build.js
