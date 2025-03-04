type MacAddress = string;
type IpAddress = string;

export interface NetworkInterface {
  name: string;
  description: string;
  index: number;
  mac?: MacAddress;
  ips: IpAddress[];
}
