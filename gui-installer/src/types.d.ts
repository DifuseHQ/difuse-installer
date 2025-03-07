type MacAddress = string;

type IpAddress = string;

type DiskImage = string;

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
export interface AppState {
  selectedDisk: DiskData | null;
  selectedNetworkInteface: NetworkInterface | null;
  selectedImage: DiskImage | null;
  isLicenceVerified: boolean;
}
