export interface Duration {
  time: "1" | "5" | "10" | "30";
  type: "second" | "minute" | "hour";
}

export function calculateEndTime(
  startTime: string,
  duration: Duration,
): string {
  const date = new Date(startTime);

  if (Number.isNaN(date.getTime())) {
    console.error("Invalid startTime:", startTime);
    return "";
  }

  const amount = Number(duration.time);

  switch (duration.type) {
    case "second":
      date.setSeconds(date.getSeconds() + amount);
      break;

    case "minute":
      date.setMinutes(date.getMinutes() + amount);
      break;

    case "hour":
      date.setHours(date.getHours() + amount);
      break;
  }

  return date.toISOString();
}

export async function convertListToStringArray(
  e: React.ChangeEvent<HTMLInputElement>,
): Promise<string[] | null> {
  const file = e.target.files?.[0];

  if (!file) {
    return null;
  }

  const text = await file.text();

  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}
