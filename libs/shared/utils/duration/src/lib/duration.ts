// @ts-nocheck
export const duration = {
  toSeconds: (timeExpr: string) => {
    const match =
      /^(?:(\d+)w)?(?:(\d+)d)?(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/.exec(
        timeExpr
      );
    return (
      604800 * (parseInt(match[1]) || 0) +
      86400 * (parseInt(match[2]) || 0) +
      3600 * (parseInt(match[3]) || 0) +
      60 * (parseInt(match[4]) || 0) +
      (parseInt(match[5]) || 0)
    );
  },
};
