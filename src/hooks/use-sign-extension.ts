import { useEffect, useState } from "haunted";
import { waitNostr } from "nip07-awaiter";

type SignExtension = Awaited<ReturnType<typeof waitNostr>>;

export const useSignExtension = (): SignExtension => {
  const [nostr, setNostr] = useState<SignExtension>(undefined);

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
