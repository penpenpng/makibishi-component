import { useEffect, useState } from "haunted";
import { waitNostr } from "nip07-awaiter";

export const useSignExtension = () => {
  const [nostr, setNostr] =
    useState<Awaited<ReturnType<typeof waitNostr>>>(undefined);

  useEffect(() => {
    waitNostr(10000)
      .then((nostr) => {
        if (nostr) {
          nostr;
          setNostr(nostr);
        }
      })
      .catch(() => {
        // noop
      });
  }, []);

  return nostr;
};
