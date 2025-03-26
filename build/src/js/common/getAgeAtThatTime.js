/**
 * 指定日が当時何歳だったかを取得する
 * ATTENSION YYYY-MM-DD、もしくはYYYYMMDDの形式で指定
 * e.g., 1975-07-09 もしくは 19750709
 *
 * @param (string) d* 指定日 YYYY-MM-DD
 * @param (string) b* 誕生日 YYYY-MM-DD
 * @return (object) 指定日の年齢と指定日年齢と現在年齢が一致か判別
 */
cmn.getAgeAtThatTime = (d, b = '1975-07-09')  => {
  let day = d,
      b_day = b,
      age_obj = {},
      now = (new Date()),
      now_year = now.getFullYear(),
      now_month = now.getMonth() + 1,
      now_day = now.getDate(),
      now_string = ''

  day = day.replace(/-/g, '')
  b_day = b_day.replace(/-/g, '')

  if (now_month < 10) {
    now_month = '0' + now_month
  }

  if (now_day < 10) {
    now_day = '0' + now_day
  }

  now_string = now_year + '' + now_month + '' + now_day

  if (day - b_day > 0) {
    age_obj.age = Math.floor((day - b_day)/10000)
    age_obj.is_same = Math.floor((now_string - b_day)/10000) === age_obj.age
  }

  return age_obj
}