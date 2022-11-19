import type { NextApiRequest, NextApiResponse } from "next";
import { channelRepository } from "../../../repositories/channelRepository";
import { handleApiError } from "../../../helpers/handleApiError";

export const GET_CHANNELS_BY_FILTER_API_URL = "/api/channels/getChannels";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const page = Number(req.query["page"]) || 0;
  const limit = Number(req.query["limit"]) || 50;

  const sortType = Array.isArray(req.query.sort_type)
    ? req.query.sort_type[0]
    : req.query.sort_type;

  const sortDirection = Array.isArray(req.query.sort_dir)
    ? req.query.sort_dir[0]
    : req.query.sort_dir;

  const filterCategory = Array.isArray(req.query.category)
    ? req.query.category[0]
    : req.query.category;
  const searchString = Array.isArray(req.query.search)
    ? req.query.search[0]
    : req.query.search;

  try {
    const channels = await channelRepository.getChannelsByFilterWithSort({
      pageNumber: page,
      pageSize: limit,
      filter: {
        category: filterCategory,
        search: searchString,
      },
      sort: {
        direction: sortDirection,
        type: sortType,
      },
    });

    res.status(200).json(channels);
  } catch (error) {
    handleApiError(res, error);
  }
};