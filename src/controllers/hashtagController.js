import { getHashtag } from "../repositories/hashtagRepository.js";

export async function getHashtagByName(req, res) {
  const { name } = req.params;
  try {
    const { rows: findHashtag } = await getHashtag(name);
    const findHashtagLength = findHashtag.length;
    if (findHashtagLength >0) {
      return res.status(200).send(findHashtag)
    } else {    
      return res.sendStatus(404);
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
}
export async function createHashtag(req, res) {}
