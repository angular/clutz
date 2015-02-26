import com.google.common.io.Files
import com.google.javascript.jscomp.ClosureToDts

import java.nio.charset.StandardCharsets

class IntegrationTest extends GroovyTestCase {

  void testTsc() {
    def library = /*closure javascript*/"""
/** @constructor @struct */
function Escaper() {}
/** @param {string} s
    @return {string}
*/
Escaper.prototype.escapeShell = function(s) {
  return '"'+s.replace(/(["\\s'\$`\\\\])/g,'\\\\\$1')+'"';
}
"""
    def test = /*typescript*/"""
import lib = require('library');
import Escaper = lib.Escaper;

function runProgram(cmd: string) {
  return new Escaper().escapeShell("echo 'hello world'");
}
"""
    Files.write(library, new File("library.js"), StandardCharsets.UTF_8);
    ClosureToDts.main("library.d.ts", "library.js");
    println "Wrote d.ts: " + new File("library.d.ts").getAbsolutePath();

    Files.write(test, new File("test.ts"), StandardCharsets.UTF_8);

    ProcessBuilder pb = new ProcessBuilder("/usr/local/bin/tsc",
        "--module", "commonjs", "test.ts", "library.d.ts").inheritIO();
    def process = pb.start();
    def exitCode = process.waitFor();
    assertEquals(0, exitCode);
  }
}
