/* 500 question instances: 50 per module. 20 distinct topic stems per module; 10 x 4 contextual variants + 10 applied challenges. */
(function(){
  const D = {
  fundamentals: {
   core:[
    ["What kind of protocol is MAVLink?","A lightweight binary messaging protocol","A video codec","A GPS constellation","A Wi-Fi security standard","MAVLink describes messages exchanged between components."],
    ["Does MAVLink require a specific physical radio?","No; it can run over different transports","Yes, 915 MHz only","Yes, 433 MHz only","Yes, 2.4 GHz only","MAVLink defines messages, not a fixed RF physical layer."],
    ["Which device is commonly called a GCS?","Ground control station","Gyroscope calibration sensor","GPS correction satellite","Ground current switch","A GCS monitors and communicates with a vehicle."],
    ["What is a MAVLink message?","A defined structure of named fields","An entire wireless network","An encrypted video frame","A motor signal waveform","Messages carry typed fields described in a dialect."],
    ["What is telemetry?","Data reporting system state","A guaranteed control command","A private encryption key","The physical RF frequency","Telemetry communicates observations and status."],
    ["Which example is typical MAVLink traffic?","A vehicle reporting its position","Raw HDMI video pixels","Analog PWM pulses to a motor","A GNSS satellite carrier","MAVLink can carry structured position data."],
    ["Where is a MAVLink message schema defined?","In message definitions such as dialect XML","Only in a radio datasheet","In USB cable pinouts","In a GPS almanac","Dialects define message IDs, types and fields."],
    ["Is MAVLink itself the same as UDP?","No; MAVLink can be carried over UDP","Yes; they are identical","No; it is only TCP","Yes; it replaces all networking","UDP is a transport mechanism for MAVLink datagrams."],
    ["What does a MAVLink microservice define?","A higher-level message exchange workflow","A faster serial baud rate","An encryption cipher suite","A specific antenna connector","Services prescribe request/response sequences."],
    ["Are all MAVLink messages acknowledged?","No; many telemetry streams are not","Yes; each packet requires ACK","Only HEARTBEAT packets are ACKed","Only packets on USB are ACKed","Reliability is provided where needed by specific microservices."]
   ],
   challenge:[
    ["A camera and autopilot communicate with one GCS. Does MAVLink support multiple components?","Yes, with component identities","No, only one sender is allowed","Only if video is disabled","Only over Ethernet"],
    ["A vehicle uses UART today and UDP tomorrow. What stays conceptually the same?","MAVLink message definitions","Serial voltage levels","UDP port framing","Connector pin numbering"],
    ["A GPS coordinate arrives as binary fields. Which layer defines its meaning?","MAVLink message schema","Wi-Fi SSID","USB connector","Antenna polarization"],
    ["The GCS displays attitude updates continuously. Is each one a transaction?","No, these are usually telemetry samples","Yes, each is a mission upload","Yes, each is a parameter write","Yes, each needs a COMMAND_ACK"],
    ["A learner thinks MAVLink controls RF modulation. What is the best correction?","MAVLink is transport-agnostic messaging","MAVLink requires LoRa modulation","MAVLink chooses antenna gain","MAVLink sets all UART clock rates"],
    ["Which protocol family usually involves retransmission logic?","Mission transfer","Periodic attitude streaming","Every heartbeat","Every status update"],
    ["Can MAVLink carry status without issuing a flight command?","Yes, through status/telemetry messages","No, all packets are commands","Only over wired USB","Only during takeoff"],
    ["Two devices agree on byte transport but disagree on a message format. What breaks?","Payload decoding","The antenna connector","The GPS satellite clock","The battery chemistry"],
    ["Why do compact binary messages help low-bandwidth links?","They reduce transmission overhead","They guarantee radio coverage","They encrypt content","They eliminate collisions"],
    ["A GCS needs an operation acknowledged. Which layer provides this pattern?","A MAVLink microservice","The ASCII text encoding","The GPS NMEA protocol","The RF antenna feed"]
   ]},
  identity:{
   core:[
    ["What does sysid in the packet header identify?","The sending system","Destination port number","Message schema version","Payload byte count"],
    ["What does compid identify?","The sending component within a system","The entire wireless band","A command argument","The packet CRC"],
    ["What does msgid identify?","The message type/schema","A specific aircraft serial number","The receiver frequency","The signing key"],
    ["What is HEARTBEAT's message ID?","0","1","33","76"],
    ["What does HEARTBEAT mainly advertise?","A component's presence and state","Waypoint count only","An encryption certificate","A firmware image"],
    ["Can one system contain multiple MAVLink components?","Yes","No","Only in MAVLink 1","Only with encryption"],
    ["Can different components send the same message type?","Yes, with different source identities","No, msgid must be globally unique per sender","Only if seq is always zero","Only with different radios"],
    ["Are header sysid and payload target_system the same role?","No; source versus destination","Yes; both always mean source","Yes; both mean checksum","No; both refer to altitude"],
    ["What can repeated HEARTBEAT messages help detect?","Loss of apparent connectivity","Guaranteed network encryption","Exact RF signal strength","GPS antenna gain"],
    ["Is heartbeat rate universally fixed by MAVLink?","No; implementations choose appropriate timing","Yes, precisely 100 Hz","Yes, precisely 10 Hz","Yes, never repeated"]
   ],
   challenge:[
    ["Source sysid 3 compid 1 means what?","Component 1 of system 3 sent this","Send to component 3","Message ID is 31","Packet has three-byte payload"],
    ["Source sysid 3 compid 100 and sysid 3 compid 1 likely share what?","The same system identity","The same component identity","The same message ID","A guaranteed identical sensor"],
    ["Two packets have msgid 0 but different sysid values. What can be true?","Two systems are sending HEARTBEAT","One packet must be corrupt","They have identical senders","The packets are necessarily signed"],
    ["A command payload targets sysid 2 but header sysid is 255. Who is sender?","System 255","System 2","System 0","No sender exists"],
    ["A GCS sees one heartbeat and then nothing. What is a safe inference?","Continuing connectivity is unconfirmed","The autopilot is definitely destroyed","The cryptographic key was stolen","The message must be MAVLink 1"],
    ["A camera publishes HEARTBEAT. Must it claim to be an autopilot?","No, it can identify as a camera component","Yes, all components claim autopilot","Only on serial links","Only if its sysid is 0"],
    ["Why use both system and component IDs?","Distinguish components of the same system","Calculate baud rate","Derive encryption keys","Set frequency channels"],
    ["Source sysid 1 is observed on two unrelated vehicles. What risk arises?","Identity collision and routing ambiguity","Automatic GPS corruption","Guaranteed frame loss","Change to MAVLink version"],
    ["What differentiates HEARTBEAT from a position message?","Its message ID and payload schema","The existence of a checksum","The presence of a start marker","Its use of a sequence number"],
    ["What is a broadcast sysid or compid of zero for a source?","Invalid as a sender source ID","The recommended vehicle source","An encrypted system","A common camera source"]
   ]},
  packet:{
   core:[
    ["Which start byte identifies MAVLink 2?","0xFD","0xFE","0xAA","0x7E"],
    ["Which start byte identifies MAVLink 1?","0xFE","0xFD","0x00","0xFF"],
    ["What does the len byte indicate?","Transmitted payload length","Entire packet length","Radio frame duration","Signed timestamp"],
    ["How many bytes make up MAVLink 2's header including magic?","10","6","12","13"],
    ["How long is a MAVLink packet checksum?","2 bytes","1 byte","8 bytes","13 bytes"],
    ["How large is an optional MAVLink 2 signature?","13 bytes","2 bytes","4 bytes","32 bytes"],
    ["How wide is a MAVLink 2 message ID?","24 bits","8 bits","16 bits","64 bits"],
    ["What is the packet seq field used for?","Identifying packet ordering/gaps","Storing GPS altitude","Signing command parameters","Encoding flight mode only"],
    ["What does incompat_flags 0x01 indicate?","The packet is signed","The packet has GPS fix","The payload is encrypted","The packet is from a GCS"],
    ["What happens to an unknown incompatibility flag?","A compliant implementation drops the packet","It always ignores the flag","It swaps the message ID","It treats the packet as MAVLink 1"]
   ],
   challenge:[
    ["Unsigned MAVLink 2 with 9 payload bytes occupies how many bytes?","21","19","22","34"],
    ["Signed MAVLink 2 with 9 payload bytes occupies how many bytes?","34","21","22","13"],
    ["MAVLink 2 message ID 0x010203 appears on wire as which bytes?","03 02 01","01 02 03","01 03 02","02 01 03"],
    ["Which byte is at wire offset zero?","Magic/start marker","Checksum high byte","Component ID","Payload last byte"],
    ["Which sequence follows the ten-byte header?","Payload bytes","Signature then CRC","Message ID again","Start marker again"],
    ["When is a 13-byte signature present?","When packet is signed","For all MAVLink 2 packets","Only if GPS is connected","For every mission item"],
    ["For an unsigned frame with zero-byte payload, minimum MAVLink 2 size is?","12 bytes","8 bytes","10 bytes","25 bytes"],
    ["Which header field differentiates msgid 33 from msgid 76?","Three-byte message ID","Sequence counter","Magic marker","System ID"],
    ["Should an unsupported compat_flags bit always cause a discard?","No, compatibility flags may be ignored","Yes, exactly like incompat_flags","Only for message 0","Only on UART"],
    ["Does the checksum include the magic byte?","No","Yes","Only in MAVLink 1","Only when signed"]
   ]},
  payload:{
   core:[
    ["What is little-endian encoding?","Least significant byte first","Most significant byte first","All bytes transmitted as ASCII","All fields are single bytes"],
    ["What is 34 12 as a little-endian uint16?","0x1234","0x3412","0x341200","0x0012"],
    ["What type represents a signed 32-bit integer?","int32_t","uint8_t","char[2]","float64_t"],
    ["How do you convert millimeters to meters?","Divide by 1000","Multiply by 1000","Divide by 10^7","Multiply by 256"],
    ["How do common GPS latitude integer fields convert to degrees?","Divide by 10^7","Multiply by 10^7","Divide by 60","Divide by 1000"],
    ["What is the message ID of GLOBAL_POSITION_INT?","33","0","76","44"],
    ["Are all fields transmitted in XML declaration order?","No, base fields are generally size-sorted","Yes, always","Only arrays are reordered alphabetically","No fields have a defined order"],
    ["Where do MAVLink 2 extension fields appear?","At the end of the serialized payload","Before the magic byte","Inside the checksum","Always in the signature"],
    ["Which trailing payload bytes can be omitted in MAVLink 2?","Zero-filled bytes at the end","Any bytes equal to 0 anywhere","All negative integer bytes","Any bytes after the sysid"],
    ["Are floating point values simply decimal text strings?","No, they use typed binary encoding","Yes, always ASCII digits","Only in MAVLink 2","Only when signed"]
   ],
   challenge:[
    ["The payload bytes 01 00 represent little-endian uint16 value?","1","256","0","65535"],
    ["The payload bytes 00 01 represent little-endian uint16 value?","256","1","0","2"],
    ["GLOBAL_POSITION_INT alt is 12500 mm. What is that in meters?","12.5 m","125 m","1.25 m","12500 m"],
    ["A latitude field stores 377749000. What is its degree value?","37.7749°","377.749°","3.77749°","0.377749°"],
    ["What field type should you consult to correctly interpret FF FF?","The message definition's declared type","Wi-Fi SSID","The sender battery","The camera model"],
    ["Why is a negative GPS latitude possible?","Latitude fields can be signed","GPS only reports unsigned bytes","The checksum is invalid","Every negative latitude is an extension"],
    ["If a field is uint8_t, how many payload bytes occupy it?","1","2","4","8"],
    ["If a field is float (32-bit), how many bytes occupy it?","4","1","2","8"],
    ["Do trimmed zero bytes in MAVLink 2 necessarily represent missing corruption?","No, compliant MAVLink 2 payload truncation exists","Yes, always a damaged frame","Only if signed","Only for heartbeat"],
    ["Is the signature part of the payload length byte?","No","Yes, always","Only in MAVLink 1","Only for msgid 33"]
   ]},
  messages:{
   core:[
    ["Which dialect provides standard shared messages?","common.xml","antenna.xml","baud.xml","uart.xml"],
    ["Where are MAVLink dialects commonly authored?","XML files","Only compiled ELF binaries","GPS NMEA sentences","Wi-Fi beacon frames"],
    ["Which message is msgid 76?","COMMAND_LONG","HEARTBEAT","GLOBAL_POSITION_INT","MISSION_COUNT"],
    ["Which message is msgid 0?","HEARTBEAT","COMMAND_ACK","ATTITUDE","PARAM_VALUE"],
    ["What does a message definition specify?","Field types, names and metadata","USB connector pins only","RF modulation only","Battery charge curve only"],
    ["What is an enum?","A mapping of numeric values to named meanings","A radio channel hopping table","A packet encryption key","An analog PWM input"],
    ["What does MAV_CMD represent?","A requested action identifier","A packet checksum type","A packet start byte","The sender component ID"],
    ["Are MAV_CMD values interchangeable with packet msgid?","No, they identify different things","Yes, always equal","Only for HEARTBEAT","Only in signed frames"],
    ["Why must peers agree on dialect definitions?","They need compatible payload layouts","To tune GPS RF front ends","To select antenna polarization","To change USB voltage"],
    ["Can vendor dialects include common.xml?","Yes","No","Only MAVLink 1 can","Only with UDP"]
   ],
   challenge:[
    ["A developer sees msgid 76 but wants the actual requested action. Where to look?","COMMAND_LONG's command field","The start marker","The sysid","The checksum byte"],
    ["The receiver doesn't recognize a vendor-specific msgid. Most likely missing?","The relevant dialect definition","A GPS receiver","An SD card","A video decoder"],
    ["A field has a MAV_RESULT enum value. What does it help communicate?","Command outcome","GNSS frequency","Serial voltage","Packet encryption"],
    ["What XML feature may change a message without breaking older decoders?","MAVLink 2 extension fields","Reusing a message ID for incompatible structure","Deleting required base fields","Randomly changing field types"],
    ["If two dialects define msgid 33 differently, what risk exists?","Incompatible decoding/CRC_EXTRA","Higher battery life","Automatic security signing","No possible issue"],
    ["Which message definition helps decode degrees vs millimeters?","The message field metadata","Packet sequence alone","Radio modulation specification","Ground-station color theme"],
    ["Which field is a command result, not a packet checksum?","MAV_RESULT","CRC_EXTRA","magic","len"],
    ["Can a dialect define new messages?","Yes, that is its purpose","No, only frame headers can change","Only if packet lengths are zero","Only over USB"],
    ["A sensor report uses msgid 33. What is a likely name?","GLOBAL_POSITION_INT","COMMAND_LONG","HEARTBEAT","MISSION_ACK"],
    ["A vendor adds a message to its dialect. Should every unrelated receiver necessarily parse it?","No; receivers need its definition","Yes, all MAVLink devices know all dialects","Yes, only the CRC is enough","No, MAVLink cannot be extended"]
   ]},
  streams:{
   core:[
    ["What does a 100 ms message interval represent?","10 Hz","1 Hz","100 Hz","0.1 Hz"],
    ["What does a 1000 ms message interval represent?","1 Hz","10 Hz","100 Hz","1000 Hz"],
    ["Which command requests a message interval change?","MAV_CMD_SET_MESSAGE_INTERVAL","MAV_CMD_NAV_LAND","MAV_CMD_COMPONENT_ARM_DISARM","MAV_CMD_DO_SET_MODE"],
    ["What happens to bandwidth demand when report rate doubles?","It approximately doubles for that stream","It halves","It remains exactly constant","It becomes encrypted"],
    ["Does every stream need guaranteed delivery of every frame?","No, many tolerate skipped samples","Yes, by default","Only MAVLink 1 streams","Only camera streams"],
    ["Which traffic is commonly relatively low rate?","HEARTBEAT","Every attitude update","Every IMU sample","Every actuator sample"],
    ["Why monitor telemetry freshness?","Old values may no longer reflect current state","To prove encrypted transport","To set sender sysid","To calculate field CRC_EXTRA"],
    ["Can a requested stream rate be rejected or limited?","Yes, depending on implementation","No, all rates are mandatory","Only by the HTML UI","Only during signing"],
    ["Does the MAVLink seq field directly measure RF power?","No","Yes","Only for GPS","Only on serial links"],
    ["How is packet loss typically suggested from seq values?","Observed unexpected gaps in sequence","All packets have msgid 0","Identical sysid and compid","CRC_EXTRA always zero"]
   ],
   challenge:[
    ["A stream sends 40-byte frames at 10 Hz. Rough raw bytes per second?","400 B/s","40 B/s","4000 B/s","4 B/s"],
    ["A stream sends 60-byte frames at 5 Hz. Rough raw bytes per second?","300 B/s","65 B/s","12 B/s","3000 B/s"],
    ["2 Hz corresponds to what interval?","500 ms","2000 ms","50 ms","250 ms"],
    ["20 Hz corresponds to what interval?","50 ms","200 ms","500 ms","20 ms"],
    ["If stream load exceeds link capacity, what may appear?","Latency or packet loss","More cryptographic privacy","Automatic smaller antennas","A new message dialect"],
    ["Do two different senders have to share one seq counter?","No, sequence behavior is per transmitting channel","Yes, one global counter is mandatory","Only if signed","Only when sending heartbeat"],
    ["A GCS asks for 10 Hz but receives 5 Hz. What is reasonable?","Check implementation limits and other link traffic","Assume the CRC always failed","Assume the vehicle is not MAVLink capable","Reflash the receiver immediately"],
    ["What is the approximate bit rate for 500 bytes/s excluding link overhead?","4000 bit/s","500 bit/s","50000 bit/s","625 bit/s"],
    ["Which resource should be budgeted as streams grow?","Link throughput","Mission waypoint index only","Component ID count only","Altitude scale only"],
    ["Can the presence of HEARTBEAT alone guarantee all telemetry is current?","No","Yes","Only with MAVLink 1","Only at 1 Hz"]
   ]},
  commands:{
   core:[
    ["Which message carries up to seven float command parameters?","COMMAND_LONG","HEARTBEAT","PARAM_VALUE","GLOBAL_POSITION_INT"],
    ["Which message acknowledges commands?","COMMAND_ACK","MISSION_COUNT","HEARTBEAT","ATTITUDE"],
    ["What does MAV_RESULT_ACCEPTED mean?","Command accepted for processing","Flight action definitely completed","Packet payload encrypted","A bad checksum was repaired"],
    ["What does MAV_RESULT_UNSUPPORTED indicate?","Recipient does not support the request","The request was successful","The link is encrypted","The packet is a heartbeat"],
    ["What should a sender do if no command ACK arrives by timeout?","Retry per command protocol policy","Assume success immediately","Ignore all further traffic","Change sysid to zero"],
    ["Which message uses integer positional fields where applicable?","COMMAND_INT","HEARTBEAT","PARAM_VALUE","COMMAND_ACK"],
    ["Which field identifies the action inside COMMAND_LONG?","command (MAV_CMD)","magic","sequence","CRC_EXTRA"],
    ["Can a command ACK indicate work still in progress?","Yes, MAV_RESULT_IN_PROGRESS","No, all commands end instantly","Only in MAVLink 1","Only over USB"],
    ["Can a lost ACK mean the command was received?","Yes","No, impossible","Only if unsigned","Only if it has msgid 0"],
    ["For long-running commands, what indicates completion?","A final COMMAND_ACK result","Any heartbeat alone","A seq value of zero","A GPS position update"]
   ],
   challenge:[
    ["A GCS sends command X and gets ACK for command Y. What next?","Keep waiting for matching ACK to X","Treat any ACK as success","Reset the radio immediately","Erase the mission"],
    ["A progress ACK says IN_PROGRESS 40%. Is that a final success?","No","Yes","Only if signed","Only for mission items"],
    ["Why prefer COMMAND_INT for supported positional commands?","It offers scaled integer positional precision","It never needs ACK","It has no target fields","It encrypts positions"],
    ["What does COMMAND_ACK with FAILED suggest?","The recipient reports execution failure","The CRC always failed","The packet must be MAVLink 1","The GCS has no sysid"],
    ["Should every retry automatically assume the earlier command had no effect?","No, command or ACK may have been lost","Yes, retransmits cannot duplicate effects","Only on wired links","Only for heartbeat"],
    ["Which pair is the core command exchange?","COMMAND_LONG → COMMAND_ACK","HEARTBEAT → MISSION_COUNT","PARAM_VALUE → HEARTBEAT","ATTITUDE → ATTITUDE"],
    ["A component refuses an action as unsupported. Which result fits?","MAV_RESULT_UNSUPPORTED","MAV_RESULT_ACCEPTED","MAV_RESULT_IN_PROGRESS","MAV_RESULT_CANCELLED"],
    ["A command accepted immediately starts a long job. What should UI watch for?","Progress and final result when implemented","Only GPS satellite count","Only CRC_EXTRA changes","Only the length byte"],
    ["Is a message ID the same value as the MAV_CMD action?","No","Yes","Only if seq is zero","Only when all targets are 1"],
    ["Does simulated command lab send packets to a real aircraft?","No, it is a local educational simulation","Yes, by default","Only if a GCS is detected","Only on mobile"]
   ]},
  missions:{
   core:[
    ["Which message starts a mission upload by declaring item count?","MISSION_COUNT","MISSION_ACK","HEARTBEAT","COMMAND_LONG"],
    ["Which message requests a numbered mission item?","MISSION_REQUEST_INT","GLOBAL_POSITION_INT","PARAM_SET","HEARTBEAT"],
    ["Which message transmits a requested mission item?","MISSION_ITEM_INT","MISSION_ACK","PARAM_VALUE","COMMAND_ACK"],
    ["Which message marks mission upload completion?","MISSION_ACK","HEARTBEAT","ATTITUDE","COMMAND_LONG"],
    ["How are mission item sequence numbers typically indexed?","Starting at zero","Starting at one only","Randomly chosen","Always 255"],
    ["Which message requests a full parameter list?","PARAM_REQUEST_LIST","PARAM_SET","MISSION_COUNT","COMMAND_ACK"],
    ["Which message sets a parameter value?","PARAM_SET","PARAM_REQUEST_LIST","HEARTBEAT","MISSION_ACK"],
    ["Which message reports a parameter value?","PARAM_VALUE","COMMAND_LONG","MISSION_ITEM_INT","GLOBAL_POSITION_INT"],
    ["What should a vehicle do with an out-of-order mission item?","Re-request expected item","Silently accept any order","Always finish mission upload","Discard all previous missions immediately"],
    ["What should a GCS wait for before declaring upload success?","Successful MISSION_ACK","Only MISSION_COUNT","Only first request","Only any heartbeat"]
   ],
   challenge:[
    ["The vehicle asks for mission item seq 1. Which item should the GCS send?","MISSION_ITEM_INT with seq 1","MISSION_ITEM_INT with seq 0","MISSION_ACK only","Any waypoint selected randomly"],
    ["Upload count is 2. Which sequence IDs should be sent?","0 and 1","1 and 2","2 and 3","0 and 2"],
    ["A mission upload errors after one item. What is safer?","Preserve prior plan and handle error","Replace prior plan with incomplete new plan","Assume mission complete","Send random item sequence"],
    ["The GCS reads a parameter. Which result supplies its value?","PARAM_VALUE","HEARTBEAT","MISSION_ACK","COMMAND_ACK"],
    ["A PARAM_SET is sent successfully at transport level. Is configuration confirmed?","Not until returned value/status is checked","Yes, immediately guaranteed","Only after reboot always","Only if CRC is nonzero"],
    ["A mission contains a geofence. Is that necessarily a flight plan item?","No, the protocol supports separate plan types","Yes, geofences cannot be exchanged","Yes, all data shares one plan type","Only on MAVLink 1"],
    ["The vehicle re-requests seq 1 after timeout. What is appropriate?","Resend seq 1","Start random new mission","Send only heartbeat","Ignore as impossible"],
    ["What does an ACK error mean for an upload?","The operation has failed or been cancelled","The new mission always succeeded","Only the GPS has failed","The payload is encrypted"],
    ["For a two-item successful upload, when is MISSION_ACK expected?","After required items are received","Before MISSION_COUNT","After first heartbeat only","Before any item is requested"],
    ["Does the mission protocol support plan download too?","Yes","No","Only parameter protocol can","Only for camera components"]
   ]},
  security:{
   core:[
    ["What is the MAVLink packet checksum algorithm?","CRC-16/MCRF4XX","SHA-512 only","AES-256","CRC32 for packet frames"],
    ["What is CRC_EXTRA used for?","Checking compatibility with message definition","Encrypting the payload","Selecting RF frequency","Identifying a GPS antenna"],
    ["Does CRC prove the sender is trusted?","No","Yes","Only in MAVLink 1","Only with heartbeat"],
    ["Does MAVLink 2 message signing encrypt payload bytes?","No","Yes, automatically","Only for msgid 0","Only on UDP"],
    ["What does signing primarily add?","Authentication and replay resistance","Payload confidentiality","Radio frequency hopping","Automatic video compression"],
    ["How many bytes are appended for signing?","13","2","6","24"],
    ["What secret is used for MAVLink 2 signature verification?","Shared secret key","Public radio frequency","Sysid alone","GPS latitude alone"],
    ["Which signature field helps reject replayed packets?","Timestamp","Payload length alone","Flight mode name","Altitude"],
    ["Which start byte is MAVLink 2?","0xFD","0xFE","0x01","0xAA"],
    ["How wide is MAVLink 1's message ID?","8 bits","24 bits","64 bits","128 bits"]
   ],
   challenge:[
    ["A payload is valid CRC but unsigned. Can a policy reject it?","Yes, if signed messages are required","No, CRC makes it trusted","No, unsigned frames are mandatory","Only GPS messages can be rejected"],
    ["What should a receiver do with an invalid signature under strict policy?","Reject the packet","Trust the CRC only","Assume encrypted contents","Convert it to MAVLink 1"],
    ["You need payload confidentiality over a public link. Is signing alone enough?","No, use appropriate encrypted transport","Yes, message signing encrypts data","Only if sysid is 1","Yes, a checksum encrypts bytes"],
    ["Which signing bit is used in MAVLink 2 incompat_flags?","0x01","0x80","0x10","0xFF"],
    ["A 13-byte signature carries link ID, timestamp, and what else?","Truncated cryptographic signature","A second GPS payload","USB descriptor","Raw pilot video"],
    ["What risks remain without anti-replay timestamp handling?","Reusing captured valid messages","Automatic increased throughput","No CRC validation","Guaranteed higher signal strength"],
    ["What protects against accidental wire corruption but not spoofing?","CRC","Physical antenna gain","Waypoint count","Payload trim"],
    ["Can an unknown incompat_flags bit be silently ignored?","No, compliant decoders reject it","Yes, all flags are ignorable","Only after CRC mismatch","Only in signed payload"],
    ["What does MAVLink 2 add to message IDs compared with MAVLink 1?","24-bit IDs","IDs removed entirely","Only 4-bit IDs","Only encrypted IDs"],
    ["Does an encrypted VPN/tunnel change MAVLink packet field meanings?","No, it adds transport protection around them","Yes, it rewrites all msgids","Yes, it eliminates checksum","Yes, it forbids heartbeat"]
   ]},
  diagnostics:{
   core:[
    ["What does a header sysid identify in a forwarded packet?","The original sending system","Always the target vehicle","The router's IP port","The GPS antenna"],
    ["What do observed seq gaps suggest?","Possible missing observed frames","Proof of intentional interference","Guaranteed encryption failure","Known antenna damage"],
    ["What can bad CRC indicate?","Corruption or incompatible definitions","Guaranteed successful command","An empty heartbeat","A new signing key"],
    ["What does a missing heartbeat alone prove?","Only that expected heartbeat was not observed","The autopilot is permanently dead","The radio was jammed","The mission was deleted"],
    ["When diagnosing decode failure, what should you check first?","Framing, transport and dialect compatibility","Change the antenna color","Disable every safety setting","Reset all mission items"],
    ["Which two fields identify a component sender?","sysid and compid","lat and lon","payload and checksum","msgid and len"],
    ["What is a relevant effect of wrong UART baud?","Framing/garbled data","Guaranteed better CRC","Automatic key exchange","Higher GPS accuracy"],
    ["Can routing bridge different transports?","Yes, e.g. UDP and UART","No, MAVLink only uses one link type","Only for encrypted MAVLink 1","Only with compass"],
    ["Does a command target always equal its source sysid?","No","Yes","Only in MAVLink 2","Only at startup"],
    ["How should an investigator describe packet loss evidence?","As an observation with alternative explanations","As proof of RF jamming","As proof of a specific component failure","As proof of an invalid dialect"]
   ],
   challenge:[
    ["You see 0xFE frames while decoding only as MAVLink 2. What matters?","0xFE marks MAVLink 1","0xFE is a signed v2 frame","0xFE is always a checksum byte","0xFE means no sender"],
    ["You see correct framing but an unexpected CRC fail for one vendor message. Check what?","Dialects and CRC_EXTRA agreement","Monitor brightness","Camera orientation","Ground-station wallpaper"],
    ["One camera sends heartbeat but autopilot does not. What can you conclude?","Camera visibility does not prove autopilot visibility","All components are online","All components are offline","It guarantees an RF fault"],
    ["A ground station has two vehicles with identical sysid. What issue may appear?","Routing and identity ambiguity","Automatic message encryption","CRC algorithm changes","Identical battery levels"],
    ["A command times out while telemetry continues. What is a reasonable next check?","Target routing and matching ACK behavior","Assume every radio has failed","Ignore the target component","Conclude GPS is disconnected"],
    ["A valid signed message is far older than accepted stream timestamp. Why reject?","Replay protection","The checksum is an encryption key","The battery is too low","The message is a mission item"],
    ["Why distinguish transport errors from protocol errors?","Different layers require different diagnoses","They are always the same thing","Every failure is a GPS issue","Protocol errors only occur in analog radios"],
    ["What should a router examine when forwarding targeted commands?","Destination-related payload fields and routing policy","Only pilot display color","Only the byte value of magic","Only the first CRC byte"],
    ["Which early diagnostic observation is most helpful?","Raw packet capture with IDs and CRC status","Unverified guess about hardware damage","Only UI icon appearance","A random command retransmission"],
    ["A sequence jumps from 254 to 0. Is that necessarily loss?","No; 8-bit counter wraps after 255","Yes, exactly 254 lost packets","Yes, a signing error occurred","Yes, the GPS rebooted"]
   ]}
 };
 const prefixes = [
  function(q){return q;},
  function(q){return "Quick check: " + q;},
  function(q){return "During a protocol lab: " + q;},
  function(q){return "Review a captured MAVLink exchange. " + q;}
 ];
 const bank={};
 Object.keys(D).forEach(function(key){
  const arr=[];
  D[key].core.forEach(function(row, i){
   prefixes.forEach(function(wrap,v){arr.push({id:key+"-c"+i+"-"+v,concept:"core-"+i,q:wrap(row[0]),answer:row[1],options:[row[1],row[2],row[3],row[4]],why:row[5]||("The correct interpretation is: "+row[1]+".")});});
  });
  D[key].challenge.forEach(function(row,i){arr.push({id:key+"-a"+i,concept:"applied-"+i,q:row[0],answer:row[1],options:[row[1],row[2],row[3],row[4]],why:"Correct: "+row[1]+". Apply the module's definitions to this scenario."});});
  if(arr.length!==50)throw Error("Question pool must be 50: "+key+" has "+arr.length);
  bank[key]=arr;
 });
 window.QUESTION_BANK=bank;
 window.quizPoolAudit=function(){return Object.fromEntries(Object.entries(bank).map(function(item){return [item[0],item[1].length];}));};
})();