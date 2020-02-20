import { BaseAdapter } from './base';

export class SegmentAdapter extends BaseAdapter {
  static isEnabled() {
    return !!process.env.SEGMENT_WRITE_KEY;
  }
}
