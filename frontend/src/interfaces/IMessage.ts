export default interface IMessage {
  text: string;
  name: string;
  id: string;
  socketId: string;
  roomId: string;
  image?: string;
  audio?: string;
  translatedText?: string | null;
}
