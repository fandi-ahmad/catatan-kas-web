declare const emailjs: {
  init(publicKey: string): void;
  send(serviceID: string, templateID: string, params: any): Promise<any>;
};
