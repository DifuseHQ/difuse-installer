type MacAddress = string;
type IpAddress = string;

export interface NetworkInterface {
  name: string;
  description: string;
  index: number;
  mac?: MacAddress;
  ips: IpAddress[];
}

export interface DiskData {
  name: string;
  file_system: string;
  available_space: number;
  total_space: number;
  mount_point: string;
}
