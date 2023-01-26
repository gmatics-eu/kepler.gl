// Copyright (c) 2023 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import styled from 'styled-components';
import VerticalToolbar from '../common/vertical-toolbar';

function MapControlToolbar() {
  const StyledToolbar = styled(VerticalToolbar)`
    position: absolute;
    right: 32px;
    transform: translateX(calc(-50% + 45px));

    .toolbar-item {
      width: 120px;
      padding: 13px 16px;
      flex-direction: row;
      justify-content: flex-start;

      .toolbar-item__svg-container {
        width: 16px;
        height: 16px;
        margin-right: 10px;
      }

      .toolbar-item__title {
        margin-left: auto;
        margin-right: auto;
      }
    }
  `;

  return StyledToolbar;
}

export default MapControlToolbar;