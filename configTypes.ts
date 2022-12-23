import { Browser, Page } from "@playwright/test";

import fs from 'fs';
import toml from 'toml';
const config = toml.parse(fs.readFileSync('./config.toml', 'utf-8'));

export default {
  BASEURL: config.base_url ?? '',
  MOCKURL: config.mock_url ?? ''
  };