/**
 * 配列をシャッフルする
 *
 * @param (array) array* シャッフルしたい配列
 * @return (array) シャッフル後の配列
 */
cmn.shuffleArray = (ary = []) => {
  let i,
      j;

  for (i = ary.length; 1 < i; i--) {
    j = Math.floor(Math.random() * i);
    [ary[j], ary[i - 1]] = [ary[i - 1], ary[j]];
  }

  return ary;
}