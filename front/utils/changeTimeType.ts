export const changeTimeStringToSeconds = (timeString: string) => {
  // 00:02:03 => 353 과 같이 타임스탬프를 초로 바꿔주는 함수
  const [hours, minutes, seconds] = timeString.split(':');
  return Number(hours) * 60 ** 2 + Number(minutes) * 60 + Number(seconds);
};

export const changeSecondsToTimeString = (seconds: number) => {
  // 353 => 00:02:03 과 같이 초를 타임스탬프로 변경해주는 함수
  const hours = Math.trunc(seconds / 3600) < 10 ? '0' + Math.trunc(seconds / 3600) : Math.trunc(seconds / 3600).toString();
  const mins = Math.trunc((seconds % 3600) / 60) < 10
    ? '0' + Math.trunc((seconds % 3600) / 60)
    : Math.trunc((seconds % 3600) / 60).toString();
  const secs = seconds % 60 < 10 ? '0' + Math.trunc(seconds % 60) : Math.trunc(seconds % 60).toString();
  return [hours, mins, secs].join(':');
};
