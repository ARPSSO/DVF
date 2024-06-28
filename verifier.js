export function verifySig(domain, signature, t) {
    const hash = require('@noble/hashes/sha256');
    const bls = require('@noble/bls12-381');

    function getHashInFp(str) {
        let h = hash.sha256(str)
        return bls.utils.mod(BigInt('0x' + Buffer.from(h).toString('hex')), bls.CURVE.r)
    }

    // pp
    const g1_x = '0x17f1d3a73197d7942695638c4fa9ac0fc3688c4f9774b905a14e3a3f171bac586c55e83ff97a1aeffb3af00adb22c6bb'
    const g1_y = '0x08b3f481e3aaa0f1a09e30ed741d8ae4fcf5e095d5d00af600db18cb2c04b3edd03cc744a2888ae40caa232946c5e7e1'
    const g1_z = '0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001'
    const g2_x0 = '0x024aa2b2f08f0a91260805272dc51051c6e47ad4fa403b02b4510b647ae3d1770bac0326a805bbefd48056c8c121bdb8'
    const g2_x1 = '0x13e02b6052719f607dacd3a088274f65596bd0d09920b61ab5da61bbdc7f5049334cf11213945d57e5ac7d055d042b7e'
    const g2_y0 = '0x0ce5d527727d6e118cc9cdc6da2e351aadfd9baa8cbdd3a76d429a695160d12c923ac9cc3baca289e193548608b82801'
    const g2_y1 = '0x0606c4a02ea734cc32acd2b02bc28b99cb3e287e85a763af267492ab572e99ab3f370d275cec1da1aaa9075ff05f79be'
    const g2_z0 = '0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001'
    const g2_z1 = '0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'

    const g1 = new bls.PointG1(new bls.Fp(BigInt(g1_x)), new bls.Fp(BigInt(g1_y)), new bls.Fp(BigInt(g1_z)))
    const g2 = new bls.PointG2(new bls.Fp2(new bls.Fp(BigInt(g2_x0)), new bls.Fp(BigInt(g2_x1))), new bls.Fp2(new bls.Fp(BigInt(g2_y0)), new bls.Fp(BigInt(g2_y1))), new bls.Fp2(new bls.Fp(BigInt(g2_z0)), new bls.Fp(BigInt(g2_z1))))

    // verfication key
    const XX = bls.PointG2.fromHex("1665cffc73b56d3f2c742c02bce2c62e3b33c8523f224fc0c5626105654fa35d7aeb8dbb0592cbe9b5b57a940762d5631407a3ef37fc1f625adeca1effae5ddfa40a890003608f39a2f3a9ba4f9ba79cff48382a79d178872e5ed2e4ec8eaaf7180b39ff006cfd3a93f1713dc3429dd52f3e7b8063f23fd46f8de582854f3e90456579a47ffc9affee7c6514255fdcff0691a831ccfc22a3d1bc51a110ba52246e55952c6117808851d8a10c0ec46bb152e75365ce18e2493d68badc025409ba")
    const YY = bls.PointG2.fromHex("0a0dfc5ebc7bac3834890d3bd4827843e00f5ea40b8789b8ca49ccc48f15273b644d4141cae5c76a1d59ccf6038e5035009a27cc903ff648bed023c6c0f30b07d033d4d7a99ab2be9b9f3a6c8a9755335c4552478975b3850f9e5eee8365484c14fc516c84de78d38a012cb3cdad014962817fa6ab55ae73d3931ccd91d5be7f0ea2f82b04f5c059fb7806e2548a8b020f0a82e41fee03d4fe12b44f87f25855e6f138db49cac8da156a255c5627007d51e5f15673159018c97e962060bcfbff")

    // attribute
    const attribute = getHashInFp(domain)

    var jsonString = atob(signature);
    var sig = JSON.parse(jsonString);

    const tt = BigInt(t)

    const sig1 = new bls.PointG1(new bls.Fp(BigInt(sig.Sigma1.X)), new bls.Fp(BigInt(sig.Sigma1.Y)), new bls.Fp(BigInt(sig.Sigma1.Z)))
    const sig2 = new bls.PointG1(new bls.Fp(BigInt(sig.Sigma2.X)), new bls.Fp(BigInt(sig.Sigma2.Y)), new bls.Fp(BigInt(sig.Sigma2.Z)))

    const left = bls.pairing(sig2, g2)
    const right0 = bls.pairing(sig1, XX)
    const right1 = bls.pairing(sig1, YY.multiply(attribute))
    const right2 = bls.pairing(sig1, g2.multiply(tt))
    const _right = right0.multiply(right1)
    const right = _right.multiply(right2)

    return left.equals(right)
}